'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const achievements = [
  { title: "Annual Sports Champions", year: "2023", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "sports trophy" },
  { title: "Inter-House Debate Winners", year: "2023", img: "https://images.unsplash.com/photo-1589994292433-6a847303a7e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "debate competition" },
  { title: "Disciplined House of the Year", year: "2022", img: "https://images.unsplash.com/photo-1560439514-e960a3ef50d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "award medal" },
  { title: "Science Olympiad - 1st Place", year: "2022", img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", hint: "science experiment" },
];

export function AchievementsSection() {
    return (
        <section id="achievements" className="relative py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">A Legacy of <span className="text-primary">Triumph</span></h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Celebrating the milestones and victories that define our journey.</p>
            </div>
            <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 h-1/2 w-full bg-primary/5 blur-3xl -z-10" />
                <Carousel opts={{ align: "start", loop: true, }} className="w-full">
                <CarouselContent className="-ml-4">
                    {achievements.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <Card className="overflow-hidden group rounded-xl border-border/20 bg-secondary/50 h-full flex flex-col">
                            <CardContent className="relative flex flex-col items-center justify-center p-0 flex-1">
                            <div className="overflow-hidden w-full">
                                <Image src={item.img} alt={item.title} data-ai-hint={item.hint} width={400} height={400} className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                            </div>
                            <div className="p-6 text-center w-full bg-secondary/80">
                                <Badge variant="default" className="absolute top-4 right-4 flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    {item.year}
                                </Badge>
                                <p className="font-headline text-2xl font-semibold">{item.title}</p>
                            </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex bg-card/80 backdrop-blur-sm hover:bg-card border-primary text-primary hover:text-primary" />
                <CarouselNext className="hidden sm:flex bg-card/80 backdrop-blur-sm hover:bg-card border-primary text-primary hover:text-primary" />
                </Carousel>
            </div>
          </div>
        </section>
    );
}
