'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DoseStatus from '@/components/dashboard/dose-status';
import SupplyGlance from '@/components/dashboard/supply-glance';
import NextAppointment from '@/components/dashboard/next-appointment';
import DoseModal from '@/components/dashboard/dose-modal';

type DoseStatusType = 'taken' | 'pending' | 'missed';

export default function DashboardPage() {
  const [doseStatus, setDoseStatus] = useState<DoseStatusType>('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogDose = () => {
    setDoseStatus('taken');
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-full">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DoseStatus status={doseStatus} />
        </div>
        <div className="space-y-6">
          <SupplyGlance />
          <NextAppointment />
        </div>
      </div>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        size="icon"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="h-8 w-8" />
        <span className="sr-only">+ Registrar Dosis</span>
      </Button>
      <DoseModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleLogDose}
      />
    </div>
  );
}
