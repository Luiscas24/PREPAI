'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface DoseModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export default function DoseModal({ isOpen, onOpenChange, onConfirm }: DoseModalProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCurrentTime(new Date().toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' }));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Dosis</DialogTitle>
          <DialogDescription>
            {currentTime ? `¿Confirmas que tomaste tu dosis de PrEP hoy a las ${currentTime}?` : 'Cargando...'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Sí, la tomé</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
