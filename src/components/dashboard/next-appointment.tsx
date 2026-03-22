'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { appointments as allAppointmentsData } from '@/lib/data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function NextAppointment() {
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Process dates on client side to avoid hydration mismatch
    const appointments = allAppointmentsData.map(a => ({...a, date: new Date(a.date)}));
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const futureAppointments = appointments
      .filter(a => a.date >= today)
      .sort((a,b) => a.date.getTime() - b.date.getTime());
      
    setNextAppointment(futureAppointments[0] || null);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Próxima Cita</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <Skeleton className='h-8 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-6 w-1/3' />
            </CardContent>
        </Card>
    )
  }

  if (!nextAppointment) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Próxima Cita</CardTitle>
            </CardHeader>
            <CardContent>
                <p>No tienes citas programadas.</p>
                 <Button asChild variant="link" className="px-0 mt-2">
                  <Link href="/agenda">
                    Ver agenda
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Próxima Cita</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <p className="font-semibold">{nextAppointment.type}</p>
            <p className="text-sm text-muted-foreground capitalize">
              🗓 {format(new Date(nextAppointment.date), "eeee, dd 'de' MMMM", { locale: es })}
            </p>
          </div>
        </div>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link href="/agenda">
            Ver todas las citas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
