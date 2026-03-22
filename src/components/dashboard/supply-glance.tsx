'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSupply } from '@/components/providers/supply-provider';
import { Skeleton } from '../ui/skeleton';

export default function SupplyGlance() {
  const { supply } = useSupply();

  if (!supply) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suministro Restante</CardTitle>
          <CardDescription><Skeleton className='h-4 w-24' /></CardDescription>
        </CardHeader>
        <CardContent>
          <Progress />
        </CardContent>
      </Card>
    );
  }

  const progressValue = (supply.pills / supply.pillsPerBottle) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suministro Restante</CardTitle>
        <CardDescription>Te quedan {supply.pills} días de PrEP.</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progressValue} aria-label={`${supply.pills} días de PrEP restantes`} />
      </CardContent>
    </Card>
  );
}
