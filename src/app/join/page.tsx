import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JoinPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section id="join" className="relative py-20 md:py-32 bg-background">
                    <div className="container max-w-4xl mx-auto text-center">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Join Dharma House</h2>
                        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                            Become a part of a legacy of strength, discipline, and victory. All students of Hasdeo Public School are welcome to join Dharma House and participate in our events and activities.
                        </p>
                        <p className="mt-4 text-lg max-w-2xl mx-auto">
                            Contact your class teacher or the school office for more information on how to be assigned to a house.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
