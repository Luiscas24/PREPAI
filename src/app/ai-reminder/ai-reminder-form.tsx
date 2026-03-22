'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generateReminder } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Bot, Loader2 } from 'lucide-react';
import { PersonalizedReminderOutput } from '@/ai/flows/personalized-dose-timing';

const initialState: {
  success: boolean;
  data?: PersonalizedReminderOutput;
  error?: string;
} = {
  success: false,
  data: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generando...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generar Recordatorio
        </>
      )}
    </Button>
  );
}

export function AiReminderForm() {
  const [state, formAction] = useActionState(generateReminder, initialState);

  return (
    <Card className="max-w-2xl mx-auto">
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            Recordatorio Personalizado con IA
          </CardTitle>
          <CardDescription>
            Crea un mensaje de recordatorio de dosis personalizado según tu ubicación y preferencia de horario.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación Actual</Label>
            <Input id="location" name="location" placeholder="Ej: Ciudad de México" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timePreference">Preferencia de Horario</Label>
            <Select name="timePreference" defaultValue="morning" required>
              <SelectTrigger id="timePreference">
                <SelectValue placeholder="Selecciona un horario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Mañana</SelectItem>
                <SelectItem value="afternoon">Tarde</SelectItem>
                <SelectItem value="evening">Noche</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {state.success && state.data && (
            <div className="rounded-lg border bg-card p-4 space-y-4">
               <h3 className="font-semibold flex items-center gap-2"><Bot className="text-primary"/> Mensaje Generado:</h3>
               <p className="text-card-foreground/90">{state.data.reminderMessage}</p>
            </div>
          )}
          {state.error && <p className="text-destructive text-sm">{state.error}</p>}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
