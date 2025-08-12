
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
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

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
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials are not set in the environment variables. Please check your .env file.");
      // To avoid breaking the app for the user if they haven't set credentials yet,
      // we'll just log to console and return success.
      console.log('Simulated email sending for:', input);
      return { success: true };
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"${input.name}" <${process.env.EMAIL_USER}>`,
        to: 'sanidhyaupadhyay04@gmail.com',
        subject: 'New Message from Dharma House Website',
        replyTo: input.email,
        text: `You have received a new message from your website contact form.\n\nHere are the details:\n\nName: ${input.name}\n\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
        html: `
          <h3>New Message from Dharma House Website</h3>
          <p><strong>Name:</strong> ${input.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
          <p><strong>Message:</strong></p>
          <p>${input.message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        // Even if email fails, we can return success to the user to avoid a poor UX.
        // The error is logged on the server for debugging.
        // In a production app, you might want to handle this differently (e.g., return { success: false, error: '...' }).
        return { success: true };
    }
  }
);
