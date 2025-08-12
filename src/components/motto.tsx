
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { DharmaHouseLogo } from '@/components/icons';

export function Motto() {
  return (
    <section id="motto" className="relative py-20 md:py-32 bg-card">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center">
            <DharmaHouseLogo className="h-16 w-16 text-primary mx-auto" />
            <h2 className="mt-6 font-headline text-4xl md:text-6xl text-foreground">"Strength. Discipline. Victory."</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">These three words are the pillars upon which Dharma House is built, guiding our actions and inspiring us to achieve greatness in all endeavors.</p>
        </div>
      </div>
    </section>
  );
}
