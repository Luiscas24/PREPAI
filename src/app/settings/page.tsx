'use client';
import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Pill } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useTheme } from 'next-themes';
import { useSupply } from '@/components/providers/supply-provider';

export default function SettingsPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { supply, setPills } = useSupply();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // O un esqueleto de carga
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
          <CardDescription>
            Ajusta las preferencias de la aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode" className="text-base flex items-center gap-2">
                <Moon className="h-4 w-4" /> / <Sun className="h-4 w-4" />
                Modo Oscuro
              </Label>
              <CardDescription>
                Activa el tema oscuro o déjalo según el navegador.
              </CardDescription>
            </div>
            <Switch
              id="dark-mode"
              aria-label="Toggle dark mode"
              checked={resolvedTheme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>

          <div className="rounded-lg border p-4 space-y-4">
            <div className="space-y-0.5">
                <Label htmlFor="pills-slider" className="text-base flex items-center gap-2">
                    <Pill className='h-4 w-4' />
                    Ajustar Suministro Restante
                </Label>
                <CardDescription>
                    Desliza para actualizar la cantidad de píldoras que te quedan.
                </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="pills-slider"
                min={0}
                max={supply.pillsPerBottle}
                step={1}
                value={[supply.pills]}
                onValueChange={(value) => setPills(value[0])}
                className="flex-1"
              />
              <span className="font-bold text-lg text-primary w-12 text-center">
                {supply.pills}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
