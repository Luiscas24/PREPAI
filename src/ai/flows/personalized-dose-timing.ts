'use server';

/**
 * @fileOverview A flow for providing personalized reminders for taking PrEP based on the user's location.
 *
 * - getPersonalizedReminder - A function that returns a personalized PrEP dose reminder message.
 * - PersonalizedReminderInput - The input type for the getPersonalizedReminder function.
 * - PersonalizedReminderOutput - The return type for the getPersonalizedReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedReminderInputSchema = z.object({
  location: z
    .string()
    .describe('The current location of the user (e.g., city, state).'),
  timePreference: z
    .string()
    .describe(
      'The preferred time of day for taking PrEP (e.g., morning, evening)'
    ),
});
export type PersonalizedReminderInput = z.infer<typeof PersonalizedReminderInputSchema>;

const PersonalizedReminderOutputSchema = z.object({
  reminderMessage: z
    .string()
    .describe('The personalized reminder message for taking PrEP.'),
});
export type PersonalizedReminderOutput = z.infer<typeof PersonalizedReminderOutputSchema>;

export async function getPersonalizedReminder(
  input: PersonalizedReminderInput
): Promise<PersonalizedReminderOutput> {
  return personalizedReminderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedReminderPrompt',
  input: {schema: PersonalizedReminderInputSchema},
  output: {schema: PersonalizedReminderOutputSchema},
  prompt: `You are a helpful assistant that provides personalized reminders for taking PrEP medication.

  Based on the user's current location ({{{location}}}) and preferred time of day ({{{timePreference}}}), create a reminder message that is both informative and encouraging.
  The message should be tailored to the user's context and help them adhere to their medication schedule.
  Make the reminder very specific, and tell the user exactly what to do.
  Example:
  Location: "New York City"
  Time Preference: "Morning"
  Reminder Message: "Good morning! Since you're in New York City, remember to take your PrEP dose now to stay protected."
  `,
});

const personalizedReminderFlow = ai.defineFlow(
  {
    name: 'personalizedReminderFlow',
    inputSchema: PersonalizedReminderInputSchema,
    outputSchema: PersonalizedReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
