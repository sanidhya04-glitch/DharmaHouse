import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const events = [
  {
    title: "Inter-House Matki Phod Challenge",
    date: "August 14, 2025",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu87nv42z1JRX66GduUFaBrrfMRyeZs2PVQg&s",
    hint: "matki phod",
    slug: "matki-phod-challenge",
  },
  {
    title: "Independence Day Celebration",
    date: "August 15, 2025",
    img: "https://images.unsplash.com/photo-1705524220939-dac17cf94236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxpbmRlcGVuZGVuY2UlMjBkYXklMjBpbmRpYXxlbnwwfHx8fDE3NTQ5MTQ3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    hint: "India independence day",
    slug: "independence-day-celebration",
  },
];

export function EventsSection() {
    return (
        <section id="events" className="relative py-20 md:py-32 bg-card">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Upcoming Events</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Join us in cheering for our house in these upcoming challenges and celebrations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Card key={index} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-border/10">
                  <CardHeader className="p-0">
                    <Image src={event.img} alt={event.title} data-ai-hint={event.hint} width={600} height={400} className="w-full h-56 object-cover" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="font-headline text-2xl">{event.title}</div>
                    <p className="flex items-center gap-2 mt-2 text-muted-foreground">
                      <Calendar className="h-4 w-4"/>
                      {event.date}
                    </p>
                    <Button variant="link" asChild className="p-0 mt-4 font-semibold text-primary">
                      <Link href={`/events/${event.slug}`}>Read More &rarr;</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
    );
}
