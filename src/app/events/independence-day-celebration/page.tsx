import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function IndependenceDayPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section className="relative py-20 md:py-32">
                    <div className="container max-w-4xl mx-auto">
                        <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary text-center">
                            Independence Day Celebration
                        </h1>
                        <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-lg">
                            <Calendar className="h-5 w-5" />
                            <span>August 15, 2025</span>
                        </div>
                        <div className="relative w-full h-96 rounded-lg overflow-hidden mt-12 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1705524220939-dac17cf94236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxpbmRlcGVuZGVuY2UlMjBkYXklMjBpbmRpYXxlbnwwfHx8fDE3NTQ5MTQ3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Independence Day Celebration"
                                data-ai-hint="India independence day"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="prose prose-invert max-w-none mx-auto mt-12 text-lg text-muted-foreground space-y-6">
                            <p>
                                Join us as we celebrate the spirit of freedom and patriotism on India's Independence Day. Dharma House will be leading the school's celebrations with a series of events designed to honor our nation's journey and achievements.
                            </p>
                            <h2 className="font-headline text-3xl text-primary">Schedule of Events</h2>
                            <ul>
                                <li>ESCORTING OF GUEST</li>
                                <li>WELCOMING OF GUESTS WITH BOUQUET</li>
                                <li>PINNING THE BADGES TO THE GUEST</li>
                                <li>FLAG HOISTING WITH NATIONAL ANTHEM</li>
                                <li>MARCH PAST BY STUDENTS' COUNCIL</li>
                                <li>WELCOME SONG</li>
                                <li>SPEECH BY PRINCIPAL SIR</li>
                                <li>PT BY CLASS 1 TO 5</li>
                                <li>SPEECH BY STUDENT</li>
                                <li>MARTIAL ARTS AND YOGA DEMONSTRATION</li>
                                <li>Speech by student</li>
                                <li>DUMBELL AND LAZIM PT</li>
                                <li>SPEECH BY CHIEF GUEST (CHAIRMAN SIR)</li>
                                <li>CLASSICAL DANCE</li>
                                <li>KG STUDENTS' DANCE</li>
                                <li>REGIONAL DANCES</li>
                                <li>PATRIOTIC DANCE</li>
                                <li>GROUP SONG</li>
                                <li>MUSICAL DRAMA</li>
                                <li>VOTE OF THANKS</li>
                            </ul>
                            <p>
                                All students, parents, and teachers are cordially invited to attend and make this day a memorable one. Let's come together to celebrate the unity and diversity of our great nation.
                            </p>
                            <p>
                                <strong>Jai Hind!</strong>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
