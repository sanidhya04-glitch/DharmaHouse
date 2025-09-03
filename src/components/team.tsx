import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { teamMembers } from '@/lib/members';

export function Team() {
  return (
    <section id="team" className="relative py-20 md:py-32 bg-secondary">
        <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">Meet the <span className="text-primary">Captains</span></h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">The driving force behind our house, leading by example with passion and dedication.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-center">
            {teamMembers.map((member, index) => (
            <div key={index} className="relative group">
                <Card className="relative text-center p-6 rounded-lg bg-card border-border/10 shadow-lg h-full transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
                    <CardContent className="flex flex-col items-center justify-center h-full p-0">
                        <div className="bg-primary/10 text-primary rounded-full p-4 mb-4 ring-2 ring-primary/20">
                           <member.icon className="h-10 w-10" />
                        </div>
                        <h3 className={`font-bold text-2xl mt-3 drop-shadow-lg ${member.nameClass}`}>{member.name}</h3>
                        <p className="text-muted-foreground text-lg">{member.role}</p>
                    </CardContent>
                </Card>
            </div>
            ))}
        </div>
        </div>
    </section>
  );
}
