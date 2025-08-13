'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const achievements = [
  { title: "3rd Position in Annual Sports", img: "https://images-cdn.ubuy.co.in/633fd7723d0e9e340b249c51-gold-silver-bronze-medals-for-1st-2nd.jpg", hint: "sports medal" },
  { title: "Disciplined House of the Year", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5O3BqOpXoVz-Bc5UVewHIF2-lrElLgLCsAJKdkULe4LoXqEj7ZBjQkRhtZb9A-2tMjVM&usqp=CAU", hint: "discipline award" },
];

export function AchievementsSection() {
    return (
        <section id="achievements" className="relative py-20 md:py-32 bg-card">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient">Our Achievements</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">A glimpse into the glory and triumphs brought home by our talented members.</p>
            </div>
            <Carousel opts={{ align: "start", loop: true, }} className="w-full">
              <CarouselContent>
                {achievements.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Card className="overflow-hidden group rounded-xl border-border/20">
                        <CardContent className="relative flex flex-col items-center justify-center p-0">
                          <Image src={item.img} alt={item.title} data-ai-hint={item.hint} width={400} height={600} className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-0 p-6 text-center text-white w-full">
                             <p className="font-headline text-2xl font-semibold drop-shadow-md">{item.title}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex bg-card/80 backdrop-blur-sm hover:bg-card border-primary text-primary hover:text-primary" />
              <CarouselNext className="hidden sm:flex bg-card/80 backdrop-blur-sm hover:bg-card border-primary text-primary hover:text-primary" />
            </Carousel>
          </div>
        </section>
    );
}
