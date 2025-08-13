
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

// Define the path for the messages file
const messagesDir = path.join(process.cwd(), 'messages');
const messagesFilePath = path.join(messagesDir, 'messages.json');

// Ensure the messages directory exists
const ensureDirectoryExists = async () => {
  try {
    await fs.mkdir(messagesDir, { recursive: true });
  } catch (error) {
    console.error('Error creating messages directory:', error);
  }
};

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().describe('The email address of the sender.'),
  message: z.string().describe('The message content.'),
  isAdmin: z.boolean().optional().describe('A flag to indicate if this is an admin request to fetch messages.'),
}).refine(data => {
    if (!data.isAdmin) {
        // For non-admin, email must be a valid email.
        return z.string().email().safeParse(data.email).success;
    }
    // For admin, no extra validation is needed for the email field.
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
      // Admin is requesting to fetch messages
      try {
        const fileContent = await fs.readFile(messagesFilePath, 'utf-8');
        const messages = JSON.parse(fileContent);
        // Sort messages by date, newest first
        messages.sort((a: { createdAt: string }, b: { createdAt: string }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return { success: true, messages };
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          // File doesn't exist yet, which is fine. Return empty array.
          return { success: true, messages: [] };
        }
        console.error('Error reading messages from file:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to fetch messages: ${errorMessage}` };
      }
    }

    // A user is sending a message
    try {
      let messages = [];
      try {
        const fileContent = await fs.readFile(messagesFilePath, 'utf-8');
        messages = JSON.parse(fileContent);
      } catch (error: any) {
        if (error.code !== 'ENOENT') {
          throw error; // Rethrow if it's not a "file not found" error
        }
        // If file doesn't exist, we'll create it with the new message.
      }

      const newMessage = {
        id: new Date().getTime().toString(), // Simple unique ID
        name: input.name,
        email: input.email,
        message: input.message,
        createdAt: new Date().toISOString(),
      };

      messages.push(newMessage);

      await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), 'utf-8');
      
      console.log('Message saved to file successfully');
      return { success: true };

    } catch (error) {
      console.error('Error saving message to file:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to save message: ${errorMessage}` };
    }
  }
);
