import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { teamMembers } from '@/lib/members';

export function Team() {
  return (
    <section id="team" className="relative py-20 md:py-32 bg-background">
        <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Our Team</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Meet the leaders of Dharma House, driving us towards victory.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
            <Card key={index} className="text-center p-6 rounded-lg bg-card border-border/10 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="flex flex-col items-center justify-center h-full">
                    <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                       <member.icon className="h-8 w-8" />
                    </div>
                    <h3 className={`font-bold text-xl mt-3 drop-shadow-lg ${member.nameClass}`}>{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    </section>
  );
}
