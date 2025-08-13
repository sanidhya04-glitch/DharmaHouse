
'use server';
/**
 * @fileOverview A flow for sending a contact message to Firestore.
 *
 * - sendContactMessage - A function that handles sending the contact form data.
 * - SendContactMessageInput - The input type for the sendContactMessage function.
 * - SendContactMessageOutput - The return type for the sendContactMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK only if it hasn't been already
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
}

const db = admin.firestore();


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
    if (!db) {
        const errorMsg = 'Firestore database is not initialized. Check server credentials.';
        console.error(errorMsg);
        return { success: false, error: errorMsg };
    }
    const messagesCollection = db.collection('contactMessages');

    if (input.isAdmin) {
      try {
        if (input.messageIdToDelete) {
          await messagesCollection.doc(input.messageIdToDelete).delete();
        } else if (input.messageIdToToggleRead) {
          const docRef = messagesCollection.doc(input.messageIdToToggleRead);
          const doc = await docRef.get();
          if (doc.exists) {
            await docRef.update({ isRead: !doc.data()?.isRead });
          }
        }
        
        const snapshot = await messagesCollection.orderBy('createdAt', 'desc').get();
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: (doc.data().createdAt.toDate()).toISOString(),
        } as z.infer<typeof MessageSchema>));

        return { success: true, messages };

      } catch (error: any) {
        console.error('Error handling admin request:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to process admin request: ${errorMessage}` };
      }
    }

    try {
      const newMessage = {
        name: input.name,
        classAndSection: input.classAndSection!,
        message: input.message,
        createdAt: new Date(),
        isRead: false,
      };

      const docRef = await messagesCollection.add(newMessage);
      
      console.log('Message saved to Firestore with ID:', docRef.id);
      return { success: true };

    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      return { success: false, error: `Failed to save message: ${errorMessage}` };
    }
  }
);
