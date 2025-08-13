
'use server';
/**
 * @fileOverview A flow for sending a contact message.
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
const SECRET_CODE = 'DHARMA@2003';
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
        // This could happen if the file is not encrypted, is corrupted, or the password is wrong.
        // Returning an empty array string to handle it gracefully.
        return '[]';
    }
}


const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().describe('The email address of the sender.'),
  message: z.string().describe('The message content.'),
  isAdmin: z.boolean().optional().describe('A flag to indicate if this is an admin request to fetch messages.'),
  messageIdToDelete: z.string().optional().describe('The ID of the message to delete.'),
  messageIdToToggleRead: z.string().optional().describe('The ID of the message to toggle read status.'),
}).refine(data => {
    if (!data.isAdmin) {
        return z.string().email().safeParse(data.email).success;
    }
    return true;
}, {
    message: "A valid email is required.",
    path: ["email"],
});


export type SendContactMessageInput = z.infer<
  typeof SendContactMessageInputSchema
>;

const MessageSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    message: z.string(),
    createdAt: z.string(),
    isRead: z.boolean().optional(),
});

const SendContactMessageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  messages: z.array(MessageSchema).optional(),
});

export type SendContactMessageOutput = z.infer<
  typeof SendContactMessageOutputSchema
>;

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

    if (input.isAdmin) {
      try {
        let fileContent = '';
        try {
            fileContent = await fs.readFile(messagesFilePath, 'utf-8');
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return { success: true, messages: [] }; // File doesn't exist, so no messages.
            }
            throw error; // Other errors
        }
        
        if (!fileContent) {
            return { success: true, messages: [] };
        }
        
        const decryptedMessages = await decrypt(fileContent);
        let messages = JSON.parse(decryptedMessages);

        if (input.messageIdToDelete) {
            const initialCount = messages.length;
            messages = messages.filter((msg: { id: string }) => msg.id !== input.messageIdToDelete);
            
            if (messages.length < initialCount) {
                const encryptedMessages = await encrypt(JSON.stringify(messages, null, 2));
                await fs.writeFile(messagesFilePath, encryptedMessages, 'utf-8');
            }
        } else if (input.messageIdToToggleRead) {
            let messageFound = false;
            messages = messages.map((msg: { id: string; isRead?: boolean }) => {
                if (msg.id === input.messageIdToToggleRead) {
                    messageFound = true;
                    return { ...msg, isRead: !msg.isRead };
                }
                return msg;
            });

            if (messageFound) {
                const encryptedMessages = await encrypt(JSON.stringify(messages, null, 2));
                await fs.writeFile(messagesFilePath, encryptedMessages, 'utf-8');
            }
        }
        
        messages.sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return { success: true, messages };
      } catch (error: any) {
        console.error('Error handling admin request:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to process admin request: ${errorMessage}` };
      }
    }

    try {
      let messages = [];
      try {
        const fileContent = await fs.readFile(messagesFilePath, 'utf-8');
        if (fileContent) {
            const decryptedMessages = await decrypt(fileContent);
            messages = JSON.parse(decryptedMessages);
        }
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }

      const newMessage = {
        id: new Date().getTime().toString(),
        name: input.name,
        email: input.email,
        message: input.message,
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      messages.push(newMessage);

      const encryptedMessages = await encrypt(JSON.stringify(messages, null, 2));
      await fs.writeFile(messagesFilePath, encryptedMessages, 'utf-8');
      
      console.log('Message saved to file successfully');
      return { success: true };

    } catch (error) {
      console.error('Error saving message to file:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to save message: ${errorMessage}` };
    }
  }
);
