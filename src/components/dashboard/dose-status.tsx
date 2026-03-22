'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface DoseStatusProps {
  status: 'taken' | 'pending' | 'missed';
}

const statusConfig = {
  taken: {
    icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
    title: '¡Dosis de Hoy Registrada! 🎉',
    description: 'Nos vemos mañana.',
    cardClass: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  },
  pending: {
    icon: <Clock className="h-12 w-12 text-yellow-500" />,
    title: 'Toma tu PrEP ahora',
    description: 'Hora de la dosis: 09:00 AM',
    cardClass: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  },
  missed: {
    icon: <AlertTriangle className="h-12 w-12 text-destructive" />,
    title: 'Dosis Perdida Ayer. 😟',
    description: 'Regístrala o contacta a tu médico.',
    cardClass: 'bg-destructive/10 border-destructive/20',
  },
};

export default function DoseStatus({ status }: DoseStatusProps) {
  const { icon, title, description, cardClass } = statusConfig[status];

  return (
    <Card className={`flex items-center p-6 ${cardClass}`}>
      <div className="mr-6 shrink-0">{icon}</div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
