import Link from 'next/link';
import { DharmaHouseLogo } from '@/components/icons';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-card text-foreground">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 md:grid-cols-3">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <DharmaHouseLogo className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold font-headline text-primary">Dharma House</span>
          </Link>
          <p className="text-muted-foreground text-center md:text-left">Hasdeo Public School, Champa, Chhattisgarh</p>
          <p className="text-muted-foreground mt-1 text-center md:text-left text-lg">"Strength. Discipline. Victory."</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-center md:text-left md:grid-cols-3 md:col-span-2">
          <div>
            <h3 className="font-semibold tracking-wider uppercase mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/achievements" className="text-muted-foreground hover:text-primary transition-colors">Achievements</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold tracking-wider uppercase mb-4 text-primary">More</h3>
            <ul className="space-y-3">
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">School Website</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
             <h3 className="font-semibold tracking-wider uppercase mb-4 text-primary">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-5">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-6 text-center text-muted-foreground text-sm">
          <div>Made by Sanidhya Upadhyay.</div>
          <div>&copy; {year} Dharma House, Hasdeo Public School. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
