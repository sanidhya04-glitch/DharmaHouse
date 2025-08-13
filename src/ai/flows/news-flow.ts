
'use server';
/**
 * @fileOverview A flow for managing news articles.
 *
 * - manageNews - A function that handles creating, fetching, and deleting news articles.
 * - ManageNewsInput - The input type for the manageNews function.
 * - ManageNewsOutput - The return type for the manageNews function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { scrypt, createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { promisify } from 'util';

// Define the path for the messages file
const messagesDir = path.join(process.cwd(), 'messages');
const newsFilePath = path.join(messagesDir, 'news.json');
const scryptAsync = promisify(scrypt);

// Encryption constants
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const SECRET_CODE = 'DHARMA@2003_NEWS'; // Separate secret for news
const ENCRYPTION_KEY_PASSWORD = SECRET_CODE;

// Ensure the messages directory exists
const ensureDirectoryExists = async () => {
  try {
    await fs.mkdir(messagesDir, { recursive: true });
  } catch (error) {
    console.error('Error creating messages directory:', error);
  }
};

async function getKey(salt: Buffer): Promise<Buffer> {
  return (await scryptAsync(ENCRYPTION_KEY_PASSWORD, salt, 32)) as Buffer;
}

async function encrypt(text: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH);
  const key = await getKey(salt);
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]).toString('hex');
}

async function decrypt(encryptedText: string): Promise<string> {
    try {
        const encryptedBuffer = Buffer.from(encryptedText, 'hex');
        const salt = encryptedBuffer.subarray(0, SALT_LENGTH);
        const iv = encryptedBuffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
        const tag = encryptedBuffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
        const encrypted = encryptedBuffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
        
        const key = await getKey(salt);
        const decipher = createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(tag);
        
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        console.error("Decryption failed:", error);
        return '[]';
    }
}

const NewsArticleSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    createdAt: z.string(),
    imageUrl: z.string().url().optional(),
    imageHint: z.string().optional(),
});

export const ManageNewsInputSchema = z.object({
  action: z.enum(['create', 'fetch', 'delete']),
  article: z.object({
    title: z.string(),
    content: z.string(),
    imageUrl: z.string().url().optional(),
    imageHint: z.string().optional(),
  }).optional(),
  articleIdToDelete: z.string().optional(),
});


export type ManageNewsInput = z.infer<
  typeof ManageNewsInputSchema
>;
export type NewsArticle = z.infer<typeof NewsArticleSchema>;

const ManageNewsOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  articles: z.array(NewsArticleSchema).optional(),
});

export type ManageNewsOutput = z.infer<
  typeof ManageNewsOutputSchema
>;

export async function manageNews(
  input: ManageNewsInput
): Promise<ManageNewsOutput> {
  return newsFlow(input);
}

const newsFlow = ai.defineFlow(
  {
    name: 'newsFlow',
    inputSchema: ManageNewsInputSchema,
    outputSchema: ManageNewsOutputSchema,
  },
  async (input) => {
    await ensureDirectoryExists();

    let articles: NewsArticle[] = [];
    try {
        const fileContent = await fs.readFile(newsFilePath, 'utf-8');
        if (fileContent) {
            const decryptedArticles = await decrypt(fileContent);
            articles = JSON.parse(decryptedArticles);
        }
    } catch (error: any) {
        if (error.code !== 'ENOENT') {
            return { success: false, error: 'Failed to read news articles.' };
        }
    }
    
    switch (input.action) {
        case 'fetch':
            articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            return { success: true, articles };

        case 'create':
            if (!input.article) {
                return { success: false, error: 'Article data is required for creation.' };
            }
            const newArticle: NewsArticle = {
                id: new Date().getTime().toString(),
                title: input.article.title,
                content: input.article.content,
                createdAt: new Date().toISOString(),
                imageUrl: input.article.imageUrl,
                imageHint: input.article.imageHint,
            };
            articles.push(newArticle);
            break;
            
        case 'delete':
            if (!input.articleIdToDelete) {
                return { success: false, error: 'Article ID is required for deletion.' };
            }
            const initialCount = articles.length;
            articles = articles.filter(article => article.id !== input.articleIdToDelete);
            if (articles.length === initialCount) {
                 return { success: false, error: 'Article not found.' };
            }
            break;
    }

    try {
      const encryptedArticles = await encrypt(JSON.stringify(articles, null, 2));
      await fs.writeFile(newsFilePath, encryptedArticles, 'utf-8');
      
      articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return { success: true, articles };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to save news article: ${errorMessage}` };
    }
  }
);
