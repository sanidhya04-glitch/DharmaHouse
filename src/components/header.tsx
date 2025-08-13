
'use client';

import React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, KeyRound } from 'lucide-react';
import { DharmaHouseLogo } from './icons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/events', label: 'Events' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/news', label: 'News' },
  { href: '/join', label: 'Join' },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'border-b border-border/40 bg-background/80 backdrop-blur-xl' : 'bg-transparent'}`}>
      <div className="container flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <DharmaHouseLogo className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">Dharma House</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
                <Link
                key={link.href}
                href={link.href}
                className={`relative transition-colors hover:text-primary ${isScrolled ? 'text-foreground' : 'text-white'} after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100`}
                >
                {link.label}
                </Link>
            ))}
            </nav>
             <Button asChild variant="ghost" size="sm" className={`transition-colors ${isScrolled ? 'text-foreground hover:bg-accent' : 'text-white hover:bg-white/20'}`}>
              <Link href="/admin">
                <KeyRound className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className={`${isScrolled ? '' : 'text-white border-white/50 bg-white/10 hover:bg-white/20'}`}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <div className="flex flex-col h-full gap-6 p-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <DharmaHouseLogo className="h-6 w-6 text-primary" />
                  <span className="font-headline text-xl font-bold text-primary">Dharma House</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                   <Link
                      href="/admin"
                      className="text-lg font-medium transition-colors hover:text-primary flex items-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <KeyRound className="h-5 w-5 mr-3" />
                      Admin
                    </Link>
                </nav>
                <div className="mt-auto text-center text-sm text-muted-foreground">
                  Made by Sanidhya
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
