'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Package, CalendarPlus, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSupply } from '@/components/providers/supply-provider';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SupplyPage() {
  const { supply, setPills } = useSupply();
  const [supplyDate, setSupplyDate] = useState('');
  const [lastRefillDate, setLastRefillDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client, preventing hydration mismatch
    const today = new Date();
    const supplyUntilDate = addDays(today, supply.pills);
    setSupplyDate(format(supplyUntilDate, "dd 'de' MMMM, yyyy", { locale: es }));
    setLastRefillDate(format(new Date(supply.lastRefill), "dd/MM/yyyy"));
    setIsLoading(false);
  }, [supply.pills, supply.lastRefill]);


  const progressValue = (supply.pills / supply.pillsPerBottle) * 100;

  if (isLoading) {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card>
                <CardHeader>
                    <Skeleton className='h-8 w-1/2 mb-2' />
                    <Skeleton className='h-4 w-3/4' />
                </CardHeader>
                <CardContent>
                    <Skeleton className='h-4 w-full' />
                </CardContent>
                <CardFooter>
                    <Skeleton className='h-10 w-48' />
                </CardFooter>
            </Card>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <Skeleton className='h-6 w-1/2' />
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Skeleton className='h-5 w-full' />
                        <Skeleton className='h-5 w-full' />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className='h-6 w-1/2 mb-2' />
                        <Skeleton className='h-4 w-3/4' />
                    </CardHeader>
                    <CardContent>
                       <Skeleton className='h-10 w-full' />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            Tu Suministro Actual
          </CardTitle>
          <CardDescription>
            {`Tu suministro actual te cubre hasta el ${supplyDate}.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{supply.pills} píldoras restantes</span>
              <span>{supply.pillsPerBottle} en total</span>
            </div>
            <Progress value={progressValue} />
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/agenda">
              Gestionar Renovación y Citas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarPlus className="h-5 w-5" />
              Historial de Suministro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Última entrega:</span>
                <span className="font-medium">{lastRefillDate}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Cantidad:</span>
                <span className="font-medium">{supply.pillsPerBottle} píldoras</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alerta de Renovación
            </CardTitle>
            <CardDescription>
              Recibe un aviso cuando tu suministro se esté agotando.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="reminder-days">Avísame cuando queden:</Label>
              <Select defaultValue="7">
                <SelectTrigger id="reminder-days">
                  <SelectValue placeholder="Selecciona días" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 días de medicamento</SelectItem>
                  <SelectItem value="7">7 días de medicamento</SelectItem>
                  <SelectItem value="10">10 días de medicamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
