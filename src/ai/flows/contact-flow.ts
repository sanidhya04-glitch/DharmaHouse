
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
import { getFirestore, collection, addDoc, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const SendContactMessageInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  message: z.string().describe('The message content.'),
  isAdmin: z.boolean().optional().describe('A flag to indicate if this is an admin request to fetch messages.'),
});

export type SendContactMessageInput = z.infer<
  typeof SendContactMessageInputSchema
>;

const SendContactMessageOutputSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  messages: z.array(z.any()).optional(),
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
    const db = getFirestore(app);
    const contactsCollection = collection(db, 'contacts');

    if (input.isAdmin) {
      // Admin is requesting to fetch messages
      try {
        const q = query(contactsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(), // Convert Firestore Timestamp to JS Date
        }));
        return { success: true, messages };
      } catch (error) {
        console.error('Error fetching messages from Firestore:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to fetch messages: ${errorMessage}` };
      }
    }


    // A user is sending a message
    // 1. Save to Firestore
    try {
      await addDoc(contactsCollection, {
        name: input.name,
        email: input.email,
        message: input.message,
        createdAt: serverTimestamp(),
      });
      console.log('Message saved to Firestore successfully');
    } catch (error) {
      console.error('Error saving message to Firestore:', error);
      // We can still try to send the SMS even if Firestore fails
    }

    // 2. Send as SMS via email-to-sms gateway
    try {
      if (!process.env.APP_EMAIL || !process.env.APP_PASSWORD) {
        throw new Error('Email credentials are not configured in environment variables.');
      }
      if (!process.env.SMS_GATEWAY_ADDRESS) {
        throw new Error('SMS Gateway Address is not configured in environment variables.');
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"${input.name}" <${process.env.APP_EMAIL}>`,
        to: process.env.SMS_GATEWAY_ADDRESS, // The recipient's email-to-sms gateway address
        subject: `New Message from ${input.name}`,
        text: `From: ${input.name} <${input.email}>\n\nMessage: ${input.message}`,
        html: `
          <p><b>From:</b> ${input.name} &lt;${input.email}&gt;</p>
          <p><b>Message:</b></p>
          <p>${input.message}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Message sent via email-to-sms gateway successfully');
      return { success: true };

    } catch (error) {
        console.error('Error sending message via email-to-sms gateway:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: `Failed to send message: ${errorMessage}` };
    }
  }
);
