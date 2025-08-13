import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

export default function MatkiPhodChallengePage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section className="relative py-20 md:py-32">
                    <div className="container max-w-4xl mx-auto">
                        <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary text-center">
                            Inter-House Matki Phod Challenge
                        </h1>
                        <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>August 14, 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                <span>CCA Period</span>
                            </div>
                        </div>
                        <div className="relative w-full h-96 rounded-lg overflow-hidden mt-12 shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1692298199920-c368383c39f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXRraSUyMHBob2R8ZW58MHx8fHwxNzU1MDExODg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Inter-House Matki Phod Challenge"
                                data-ai-hint="matki phod"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="prose prose-invert max-w-none mx-auto mt-12 text-lg text-muted-foreground space-y-6">
                            <p>
                                Get ready for an exciting and traditional showdown! In celebration of Janmashtami, Dharma House is proud to participate in the Inter-House Matki Phod Challenge. This event is a test of teamwork, strategy, and agility.
                            </p>
                            <h2 className="font-headline text-3xl text-primary">Event Details</h2>
                            <p>
                                Each house will form a human pyramid to reach and break the 'matki' (earthen pot) filled with buttermilk, suspended high in the air. The house that breaks the matki in the shortest time will be declared the winner.
                            </p>
                             <p>
                                We call upon all members of Dharma House to come and support our participants. Your cheers will be our strength! Let's show our unity and competitive spirit.
                            </p>
                            <p>
                                All students are welcome to watch the event at the main school ground.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
