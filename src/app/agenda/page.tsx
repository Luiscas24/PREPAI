'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { appointments as appointmentsData } from '@/lib/data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Appointment } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

function AgendaPageClient() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Procesa las fechas de forma segura en el lado del cliente para evitar errores de hidratación
    const clientSideAppointments = appointmentsData.map(a => ({...a, date: new Date(a.date)}));
    setAppointments(clientSideAppointments);
    setIsLoading(false);
  }, []); // El array de dependencias vacío asegura que esto solo se ejecute una vez

  if (isLoading) {
    return (
        <div className="w-full space-y-4">
            <Skeleton className="h-10 w-full" />
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  const clinicalAppointments = appointments.filter(
    (a) => a.type === 'Control trimestral' || a.type === 'Exámenes de sangre'
  );
  const deliveryVisits = appointments.filter(
    (a) => a.type === 'Solicitud de Entrega'
  );

  return (
    <>
      <Tabs defaultValue="clinical" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clinical">Citas de Control</TabsTrigger>
          <TabsTrigger value="delivery">Entrega de Medicamento</TabsTrigger>
        </TabsList>
        <TabsContent value="clinical">
          <Card>
            <CardHeader>
              <CardTitle>Citas de Control Médico</CardTitle>
              <CardDescription>Requeridas cada 3 meses para la continuidad de PrEP.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {clinicalAppointments.map((appt) => (
                <Card key={appt.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <CalendarIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div className='flex-grow'>
                      <p className="font-semibold">{appt.type}</p>
                      <p className="text-sm capitalize">
                        {format(new Date(appt.date), "eeee, dd 'de' MMMM, yyyy 'a las' p", { locale: es })}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{appt.location}</span>
                      </div>
                      {appt.notes && (
                        <div className="mt-3 flex items-start gap-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <p><span className='font-bold'>¡Importante! </span>{appt.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Visitas para Radicar Solicitud</CardTitle>
              <CardDescription>Gestiona la entrega de tu medicamento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deliveryVisits.map((visit) => (
                 <Card key={visit.id} className="p-4">
                  <p className="font-semibold">Próxima Visita de Radicación</p>
                  <p className='text-sm text-muted-foreground'>Tu próxima solicitud debe radicarse antes del:</p>
                  <p className="text-lg font-bold text-primary">{format(new Date(visit.date), "dd 'de' MMMM, yyyy", { locale: es })}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button>
                      <CheckCircle className="mr-2 h-4 w-4" /> Marcar como Radicada
                    </Button>
                    <Button variant="outline">Ver Puntos de Radicación</Button>
                  </div>
                 </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}


const AgendaPageWithNoSSR = dynamic(() => Promise.resolve(AgendaPageClient), {
  ssr: false,
  loading: () => (
    <div className="w-full space-y-4">
        <Skeleton className="h-10 w-full" />
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </CardContent>
        </Card>
    </div>
  ),
});

export default function AgendaPage() {
    return <AgendaPageWithNoSSR />;
}
