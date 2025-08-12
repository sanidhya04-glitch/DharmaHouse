import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book, Film, Lightbulb } from "lucide-react";

const resources = [
    {
        title: "Study Materials",
        description: "Access notes, question banks, and other study materials for your classes.",
        link: "#",
        icon: Book
    },
    {
        title: "Competition Guides",
        description: "Get tips and resources for various inter-house competitions.",
        link: "#",
        icon: Lightbulb
    },
    {
        title: "Educational Videos",
        description: "A curated list of videos to help with your studies and personal growth.",
        link: "#",
        icon: Film
    }
];

export default function ResourcesPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section id="resources" className="relative py-20 md:py-32 bg-background">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Student Resources</h2>
                            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Helpful resources for the members of Dharma House.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {resources.map((resource, index) => (
                                <Card key={index} className="p-6 text-center">
                                    <CardContent className="flex flex-col items-center">
                                        <resource.icon className="h-12 w-12 text-primary mb-4" />
                                        <CardTitle className="font-headline text-2xl mb-2">{resource.title}</CardTitle>
                                        <p className="text-muted-foreground mb-4">{resource.description}</p>
                                        <Button asChild>
                                            <Link href={resource.link}>Access Now</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
