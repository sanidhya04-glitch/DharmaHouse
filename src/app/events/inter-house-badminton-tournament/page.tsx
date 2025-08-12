import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Calendar, Users } from "lucide-react";

export default function BadmintonTournamentPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section className="relative py-20 md:py-32">
                    <div className="container max-w-4xl mx-auto">
                        <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary text-center">
                            Inter-House Badminton Tournament
                        </h1>
                        <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>August 17, 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span>Classes 9th - 12th</span>
                            </div>
                        </div>
                        <div className="relative w-full h-96 rounded-lg overflow-hidden mt-12 shadow-2xl">
                            <Image
                                src="https://s10896.pcdn.co/wp-content/uploads/2024/01/Pembroke-Generic-Badminton-Tournament-Web-Event-Header.jpg"
                                alt="Badminton Tournament"
                                data-ai-hint="badminton tournament"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="prose prose-invert max-w-none mx-auto mt-12 text-lg text-muted-foreground space-y-6">
                            <p>
                                Get ready for some high-flying action! Dharma House is excited to participate in the Inter-House Badminton Tournament. We are calling all our skilled players from classes 9th to 12th to represent our house with sportsmanship and zeal.
                            </p>
                            <h2 className="font-headline text-3xl text-primary">Event Details</h2>
                            <ul>
                                <li><strong>Venue:</strong> School Indoor Stadium</li>
                                <li><strong>Time:</strong> CCA Period</li>
                                <li><strong>Categories:</strong> Boys' Singles, Girls' Singles, Boys' Doubles, Girls' Doubles, Mixed Doubles</li>
                            </ul>
                            <p>
                                Trials for team selection will be held next week. Interested students are requested to register their names with the sports captain. Let's aim for the shuttlecock and the championship!
                            </p>
                            <p>
                                <strong>Go, Dharma House!</strong>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
