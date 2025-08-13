
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Motto } from '@/components/motto';
import { Team } from '@/components/team';
import { AboutSection } from '@/components/about';
import { EventsSection } from '@/components/events';
import { AchievementsSection } from '@/components/achievements';
import { GallerySection } from '@/components/gallery-section';
import { ContactSection } from '@/components/contact';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
      <Header />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section id="home" className="relative h-screen w-full flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 h-screen w-full -z-10">
              <Image
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHdlYXJpbmclMjBvcmFuZ2V8ZW58MHx8fHwxNzU1MDExODg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Dharma House students at an event"
                data-ai-hint="students wearing orange"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-hero-gradient" />
          </div>

          <div className="container max-w-7xl animate-fade-in-up pt-16">
            <h1 className="font-headline text-5xl md:text-8xl font-bold drop-shadow-lg text-gradient">United in Spirit, Driven to Win.</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md text-white/80">
              The official hub for Dharma House of Hasdeo Public School. Celebrating our journey of strength, discipline, and victory.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-300 ease-in-out hover:scale-105 group">
              <Link href="/events">
                View Upcoming Events
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>

        <Motto />

        <AboutSection />

        <Team />
        
        <EventsSection />
        
        <AchievementsSection />

        <GallerySection />

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
