
'use client';
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Being in Dharma House taught me the importance of teamwork and perseverance. It's more than a house; it's a family that pushes you to be your best.",
        author: "Aarav Sharma",
        class: "Class of 2023",
    },
    {
        quote: "The competitive yet supportive environment in Dharma House helped me build confidence. I made friends for life and learned invaluable lessons in leadership.",
        author: "Priya Singh",
        class: "Class of 2022",
    },
    {
        quote: "From sports to cultural events, Dharma House always had our backs. The spirit of unity is something I'll carry with me forever.",
        author: "Rohan Gupta",
        class: "Class of 2023",
    },
];

export function Testimonials() {
    return (
        <section id="testimonials" className="relative py-20 md:py-32 bg-background">
            <div className="container max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">Student <span className="text-primary">Voices</span></h2>
                    <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Hear what our members have to say about their experience.</p>
                </div>
                <Carousel opts={{ align: "start", loop: true }} className="w-full">
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <Card className="bg-transparent border-0 shadow-none">
                                    <CardContent className="flex flex-col items-center justify-center text-center p-6">
                                        <Quote className="h-10 w-10 text-primary mb-4" />
                                        <p className="text-xl md:text-2xl font-medium text-foreground/90 max-w-3xl">"{testimonial.quote}"</p>
                                        <div className="mt-6">
                                            <p className="font-semibold text-lg text-primary">{testimonial.author}</p>
                                            <p className="text-muted-foreground">{testimonial.class}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex bg-card/80 backdrop-blur-sm hover:bg-card border-primary text-primary hover:text-primary" />
                    <CarouselNext className="hidden sm:flex bg-card/80 backdrop-blur-sm hover:bg-card border-primary text-primary hover:text-primary" />
                </Carousel>
            </div>
        </section>
    );
}
