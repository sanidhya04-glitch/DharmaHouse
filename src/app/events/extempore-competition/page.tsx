import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

export default function ExtemporeCompetitionPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section className="relative py-20 md:py-32">
                    <div className="container max-w-4xl mx-auto">
                        <div className="relative">
                            <Image 
                                src="https://images.unsplash.com/photo-1508925349630-9b5a435a2c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZ3xlbnwwfHx8fDE3MjE5Mjc0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Extempore Competition"
                                data-ai-hint="public speaking"
                                width={1200}
                                height={600}
                                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                            />
                             <div className="absolute inset-0 bg-black/50 rounded-2xl" />
                             <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                                <h1 className="font-headline text-4xl md:text-6xl font-bold text-gradient">Extempore Competition</h1>
                                <p className="text-xl mt-2 text-white/80">Showcase your wit and eloquence!</p>
                             </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 mt-16">
                            <div className="prose prose-invert lg:prose-xl max-w-none text-muted-foreground">
                                <h2 className="text-gradient font-headline">Event Description</h2>
                                <p>
                                    Unleash your spontaneity and command of language in our exciting Extempore Competition. Participants will be given a topic on the spot and will have a brief preparation time before they present their thoughts.
                                </p>
                                <p>
                                    This is a fantastic opportunity to sharpen your public speaking skills, think on your feet, and build confidence. We encourage all eligible students to participate and make their house proud.
                                </p>
                            </div>
                            <div className="bg-card/50 border border-border/10 rounded-xl p-8 shadow-lg">
                                <h3 className="font-headline text-2xl text-primary mb-6">Event Details</h3>
                                <ul className="space-y-5 text-lg">
                                    <li className="flex items-center gap-4">
                                        <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
                                        <span><strong className="text-foreground">Date:</strong> September 5, 2024</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                                        <span><strong className="text-foreground">Time:</strong> 1:30 PM - 2:30 PM</span>
                                    </li>
                                     <li className="flex items-center gap-4">
                                        <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                                        <span><strong className="text-foreground">Venue:</strong> Auditorium</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Users className="h-6 w-6 text-primary flex-shrink-0" />
                                        <span><strong className="text-foreground">Participants:</strong> Classes 9th & 10th</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
