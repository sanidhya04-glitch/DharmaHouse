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
                                <li><strong>8:00 AM:</strong> Flag Hoisting Ceremony at the School Ground</li>
                                <li><strong>9:00 AM:</strong> Special Assembly featuring patriotic songs and speeches</li>
                                <li><strong>10:00 AM:</strong> Inter-House March Past Competition</li>
                                <li><strong>11:00 AM:</strong> Cultural Program showcasing dances and skits</li>
                                <li><strong>12:00 PM:</strong> Prize Distribution</li>
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
