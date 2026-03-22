'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { doseHistory as doseHistoryData } from '@/lib/data';
import { CheckCircle2, XCircle, Info, Clock } from 'lucide-react';
import { format, isSameDay, isPast, isToday, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useMemo, useState, useEffect } from 'react';
import { Dose } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HistoryPage() {
  const [doseHistory, setDoseHistory] = useState<Dose[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // Process dates on the client side to avoid hydration issues
    const clientSideDoseHistory = doseHistoryData.map(d => ({
        ...d,
        date: new Date(d.date)
    }));
    setDoseHistory(clientSideDoseHistory);
    setIsLoading(false);
  }, []);

  const adherenceData = useMemo(() => {
    if (!doseHistory || doseHistory.length === 0) {
      return {
        percentage: 0,
        chartData: [],
      };
    }
    const taken = doseHistory.filter((d) => d.status === 'taken').length;
    const missed = doseHistory.length - taken;
    const adherence = (taken / doseHistory.length) * 100;
    return {
      percentage: Math.round(adherence),
      chartData: [
        { name: 'Tomada', value: taken, fill: 'hsl(var(--primary))' },
        { name: 'Perdida', value: missed, fill: 'hsl(var(--destructive))' },
      ],
    };
  }, [doseHistory]);

  const takenDays = useMemo(() => doseHistory.filter((d) => d.status === 'taken').map((d) => d.date as Date), [doseHistory]);
  const missedDays = useMemo(() => doseHistory.filter((d) => d.status === 'missed').map((d) => d.date as Date), [doseHistory]);
  
  const dosesToShow = useMemo(() => {
    if (selectedDate) {
      const dosesForDate = doseHistory.filter((dose) => isSameDay(dose.date as Date, selectedDate));
      if (dosesForDate.length > 0) {
        return dosesForDate;
      }
      
      const today = startOfDay(new Date());
      const selectedDay = startOfDay(selectedDate);
      
      if (isSameDay(selectedDay, today)) {
        return [{ date: selectedDate, status: 'pending' }];
      }
      
      let status: 'missed' | 'pending' = 'pending';
      if (isPast(selectedDay) && !isSameDay(selectedDay, today)) {
        status = 'missed';
      }

      return [{ date: selectedDate, status: status }];
    }
    return doseHistory.sort((a,b) => (b.date as Date).getTime() - (a.date as Date).getTime()).slice(0, 7);
  }, [selectedDate, doseHistory]);


  if (isLoading) {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <Skeleton className="h-48 w-48 rounded-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <Skeleton className="w-[280px] h-[330px]" />
                </CardContent>
            </Card>
            <Card className="md:col-span-2">
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tu Adherencia</CardTitle>
          <CardDescription>Basado en los últimos 90 días.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <div className="relative h-48 w-48">
                <ChartContainer config={{}} className="absolute inset-0">
                    <PieChart>
                    <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={adherenceData.chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                    >
                        {adherenceData.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{adherenceData.percentage}%</span>
                    <span className="text-sm text-muted-foreground">Adherencia</span>
                </div>
            </div>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Calendario Mensual</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex justify-center items-center">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{
                taken: takenDays,
                missed: missedDays,
                }}
                modifiersClassNames={{
                taken: 'bg-primary/20 text-primary-foreground',
                missed: 'bg-destructive/20 text-destructive-foreground',
                }}
                locale={es}
            />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Registro de Dosis</CardTitle>
          <CardDescription>
            {selectedDate 
              ? `Mostrando registro para el ${format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}.`
              : "Mostrando los 7 registros más recientes."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dosesToShow.length > 0 ? (
            <ul className="space-y-4">
              {dosesToShow.map((dose) => (
                <li key={dose.date.toString()} className="flex items-center">
                  {dose.status === 'taken' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {dose.status === 'missed' && <XCircle className="h-5 w-5 text-destructive" />}
                  {dose.status === 'pending' && <Clock className="h-5 w-5 text-yellow-500" />}
                  <span className="ml-3 capitalize">
                    {format(dose.date as Date, "eeee, dd 'de' MMMM", { locale: es })}
                  </span>
                  <span
                    className={`ml-auto text-sm font-medium ${
                      dose.status === 'taken' ? 'text-green-600' : 
                      dose.status === 'missed' ? 'text-destructive' : 'text-yellow-600'
                    }`}
                  >
                    {dose.status === 'taken' ? 'Dosis tomada' : 
                     dose.status === 'missed' ? 'Dosis perdida' : 'Dosis pendiente'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
             <div className="flex items-center justify-center text-sm text-muted-foreground p-4">
               <Info className="mr-2 h-4 w-4" />
               {selectedDate ? "No hay registros para el día seleccionado." : "No hay registros recientes."}
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
