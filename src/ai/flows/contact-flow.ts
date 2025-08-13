
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
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  message: z.string().describe('The message content.'),
});

export type SendContactMessageInput = z.infer<
  typeof SendContactMessageInputSchema
>;

const SendContactMessageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
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
    try {
      const db = getFirestore(app);
      const contactsCollection = collection(db, 'contacts');
      
      await addDoc(contactsCollection, {
        ...input,
        createdAt: serverTimestamp(),
      });
      
      console.log('Message saved to Firestore successfully');
      return { success: true };
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to save message: ${errorMessage}` };
    }
  }
);
