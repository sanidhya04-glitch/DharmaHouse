
'use server';
/**
 * @fileOverview A flow for sending a contact message to a local JSON file.
 *
 * - sendContactMessage - A function that handles sending the contact form data.
 * - SendContactMessageInput - The input type for the sendContactMessage function.
 * - SendContactMessageOutput - The return type for the sendContactMessage function.
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
const messagesFilePath = path.join(messagesDir, 'messages.json');
const scryptAsync = promisify(scrypt);

// Encryption constants
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const SECRET_CODE = process.env.MESSAGE_SECRET_CODE || 'DHARMA@2003_MESSAGES';
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

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  classAndSection: z.string().optional().describe('The class and section of the sender.'),
  message: z.string().describe('The message content.'),
  isAdmin: z.boolean().optional().describe('A flag to indicate if this is an admin request to fetch messages.'),
  messageIdToDelete: z.string().optional().describe('The ID of the message to delete.'),
  messageIdToToggleRead: z.string().optional().describe('The ID of the message to toggle read status.'),
}).refine(data => {
    if (!data.isAdmin) {
        return !!data.classAndSection;
    }
    return true;
}, {
    message: "Class and Section is required.",
    path: ["classAndSection"],
});


export type SendContactMessageInput = z.infer<
  typeof SendContactMessageInputSchema
>;

const MessageSchema = z.object({
    id: z.string(),
    name: z.string(),
    classAndSection: z.string(),
    message: z.string(),
    createdAt: z.string(),
    isRead: z.boolean().optional(),
});

export type Message = z.infer<typeof MessageSchema>;

const SendContactMessageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  messages: z.array(MessageSchema).optional(),
});

export type SendContactMessageOutput = z.infer<
  typeof SendContactMessageOutputSchema
>;

const saveMessagesToFile = async (messages: Message[]): Promise<boolean> => {
    try {
        const encryptedMessages = await encrypt(JSON.stringify(messages, null, 2));
        await fs.writeFile(messagesFilePath, encryptedMessages, 'utf-8');
        return true;
    } catch (error) {
        console.error('Failed to save messages:', error);
        return false;
    }
}

export async function sendContactMessage(
  input: SendContactMessageInput
): Promise<SendContactMessageOutput> {
  return contactFlow(input);
}

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: SendContactMessageInputSchema,
    outputSchema: SendContactMessageOutputSchema,
  },
  async (input) => {
    await ensureDirectoryExists();

    let messages: Message[] = [];
    try {
        const fileContent = await fs.readFile(messagesFilePath, 'utf-8');
        if (fileContent) {
            const decryptedMessages = await decrypt(fileContent);
            messages = JSON.parse(decryptedMessages);
        }
    } catch (error: any) {
        if (error.code !== 'ENOENT') {
             return { success: false, error: 'Failed to read contact messages.' };
        }
        // File doesn't exist, which is fine, we'll start with an empty array.
    }
      
    if (input.isAdmin) {
        if (input.messageIdToDelete) {
          messages = messages.filter(msg => msg.id !== input.messageIdToDelete);
        } else if (input.messageIdToToggleRead) {
          messages = messages.map(msg => 
            msg.id === input.messageIdToToggleRead ? { ...msg, isRead: !msg.isRead } : msg
          );
        }
        
        if (input.messageIdToDelete || input.messageIdToToggleRead) {
            if (!await saveMessagesToFile(messages)) {
                return { success: false, error: 'Failed to update message file.' };
            }
        }
        
        messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return { success: true, messages };
    }

    try {
      const newMessage: Message = {
        id: new Date().getTime().toString(),
        name: input.name,
        classAndSection: input.classAndSection!,
        message: input.message,
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      messages.push(newMessage);
      
      if (!await saveMessagesToFile(messages)) {
        return { success: false, error: `Failed to save message.` };
      }
      
      return { success: true };

    } catch (error) {
      console.error('Error saving message:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to save message: ${errorMessage}` };
    }
  }
);
