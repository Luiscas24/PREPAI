'use server';

import {
  getPersonalizedReminder,
  PersonalizedReminderInput,
  PersonalizedReminderOutput,
} from '@/ai/flows/personalized-dose-timing';

type ActionResult = {
    success: boolean;
    data?: PersonalizedReminderOutput;
    error?: string;
}

export async function generateReminder(
  input: PersonalizedReminderInput
): Promise<ActionResult> {
  try {
    const result = await getPersonalizedReminder(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate reminder.' };
  }
}
