import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const events = [
];

export function EventsSection() {
    return (
        <section id="events" className="relative py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">Upcoming <span className="text-primary">Events</span></h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Join us in cheering for our house in these upcoming challenges and celebrations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.length > 0 ? events.map((event, index) => (
                <Card key={index} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-secondary/50 border-border/20">
                  <CardHeader className="p-0 overflow-hidden">
                    <Image src={event.img} alt={event.title} data-ai-hint={event.hint} width={600} height={400} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </CardHeader>
                  <CardContent className="p-6">
                     <Badge variant="default" className="mb-2">{event.date}</Badge>
                    <div className="font-headline text-2xl text-foreground">{event.title}</div>
                    <p className="text-muted-foreground mt-2 line-clamp-2">
                      {event.description}
                    </p>
                    <Button variant="link" asChild className="p-0 mt-4 font-semibold text-primary group/link">
                      <Link href={`/events`}>
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )) : (
                <div className="text-center text-muted-foreground text-lg col-span-full border-2 border-dashed border-border/20 rounded-lg p-12">
                  There are no upcoming events scheduled at the moment. Please check back later!
                </div>
              )}
            </div>
          </div>
        </section>
    );
}
