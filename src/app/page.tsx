
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AboutSection } from '@/components/about';
import { EventsSection } from '@/components/events';
import { AchievementsSection } from '@/components/achievements';
import { GallerySection } from '@/components/gallery-section';
import { ContactSection } from '@/components/contact';
import { ArrowDown, MoveRight } from 'lucide-react';
import { Team } from '@/components/team';
import { Pillars } from '@/components/pillars';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Cta } from '@/components/cta';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
      <Header />
      <main className="flex-1">
        
        {/* Hero Section */}
        <section id="home" className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
          <div className="absolute inset-0 h-screen w-full -z-10">
              <div className="absolute inset-0 bg-orange-600/20" />
               <Image
                src="https://images.unsplash.com/photo-1523050854058-8DF90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Students celebrating graduation"
                data-ai-hint="students graduation celebration"
                fill
                className="object-cover animate-zoom-in"
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container max-w-7xl animate-fade-in-up">
            <h1 className="font-headline text-5xl md:text-8xl font-bold drop-shadow-lg text-gradient-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              United in Spirit.
            </h1>
            <h1 className="font-headline text-5xl md:text-8xl font-bold drop-shadow-lg text-gradient-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
               Driven to Win.
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md text-white/80 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
             Welcome to Dharma House – The beating heart of Hasdeo Public School.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-white hover:text-primary transition-all duration-300 ease-in-out hover:scale-105 group animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Link href="#about">
                Explore Our Journey
                <MoveRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <ArrowDown className="h-8 w-8 text-white/50" />
           </div>
        </section>
        
        <AboutSection />

        <Pillars />

        <AchievementsSection />

        <GallerySection />
        
        <Team />
        
        <Testimonials />

        <EventsSection />

        <Cta />

        <FAQ />

        <ContactSection />
        
      </main>
      <Footer />
    </div>
  );
}
