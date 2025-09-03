
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Medal, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const pillars = [
    {
        icon: Shield,
        title: "Discipline",
        description: "Upholding integrity and accountability in every action, creating a foundation of respect and order."
    },
    {
        icon: Users,
        title: "Leadership",
        description: "Inspiring others through action, fostering a community of proactive and responsible individuals."
    },
    {
        icon: Medal,
        title: "Teamwork",
        description: "Collaborating to achieve common goals, knowing that our collective strength is our greatest asset."
    },
    {
        icon: Award,
        title: "Victory",
        description: "Striving for excellence in every field, celebrating both personal growth and collective success."
    },
]

export function Pillars() {
    return (
        <section id="pillars" className="relative py-20 md:py-32 bg-background">
            <div className="container max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">The Pillars of <span className="text-primary">Dharma</span></h2>
                    <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">These are the core values that guide every member of our house.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div 
                            key={index}
                             initial={{ opacity: 0, y: 50 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="text-center h-full bg-secondary/30 border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full text-primary ring-2 ring-primary/20">
                                        <pillar.icon className="h-8 w-8" />
                                    </div>
                                    <CardTitle className="font-headline text-2xl pt-2">{pillar.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{pillar.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
