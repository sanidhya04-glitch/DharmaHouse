
'use client';
import { Button } from "@/components/ui/button";

export function Cta() {
    return (
        <section id="cta" className="relative py-20 md:py-32 bg-secondary">
            <div className="container max-w-4xl mx-auto text-center">
                <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">Are You Ready to <span className="text-primary">Represent Dharma?</span></h2>
                <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                    Join the spirit, the family, the challenge. Become a part of a legacy of strength, discipline, and victory.
                </p>
                <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-white hover:text-primary transition-all duration-300 ease-in-out hover:scale-105 group">
                    Get Involved
                </Button>
            </div>
        </section>
    );
}
