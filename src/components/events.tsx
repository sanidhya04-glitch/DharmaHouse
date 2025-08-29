import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

const events = [
  {
    title: 'Extempore Competition',
    slug: 'extempore-competition',
    date: 'September 5, 2024',
    img: 'https://i.imgur.com/OqGgI0z.png',
    hint: 'extempore speech',
  },
];

export function EventsSection() {
    return (
        <section id="events" className="relative py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient">Upcoming Events</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Join us in cheering for our house in these upcoming challenges and celebrations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length > 0 ? events.map((event, index) => (
                <Card key={index} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card border-border/20">
                  <CardHeader className="p-0 overflow-hidden">
                    <Image src={event.img} alt={event.title} data-ai-hint={event.hint} width={600} height={400} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="font-headline text-2xl text-foreground">{event.title}</div>
                    <p className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary"/>
                      {event.date}
                    </p>
                    <Button variant="link" asChild className="p-0 mt-4 font-semibold text-primary group/link">
                      <Link href={`/events/${event.slug}`}>
                        Read More 
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center text-muted-foreground text-lg col-span-full">
                  There are no upcoming events scheduled at the moment. Please check back later!
                </div>
              )}
            </div>
          </div>
        </section>
    );
}
