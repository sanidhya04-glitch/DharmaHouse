
'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is the main objective of Dharma House?",
        answer: "The main objective of Dharma House is to foster a sense of unity, discipline, and healthy competition among students. We aim to nurture leadership skills and encourage participation in both academic and extracurricular activities to promote holistic development."
    },
    {
        question: "How can I join Dharma House?",
        answer: "All students of Hasdeo Public School are assigned to one of the four houses at the time of admission. If you are a new student, your house will be allocated by the school administration. You can contact your class teacher for more information."
    },
    {
        question: "What kind of events does Dharma House organize?",
        answer: "Dharma House participates in and organizes a wide range of events, including annual sports competitions, debate and extempore challenges, cultural festivals, science exhibitions, and various other inter-house activities throughout the academic year."
    },
    {
        question: "How are the house captains and other leaders selected?",
        answer: "House captains and other leadership positions are selected based on a combination of academic performance, extracurricular participation, leadership qualities, and recommendations from teachers. The selection process typically takes place at the beginning of the academic year."
    }
];


export function FAQ() {
    return (
        <section id="faq" className="relative py-20 md:py-32 bg-background">
            <div className="container max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">Frequently Asked <span className="text-primary">Questions</span></h2>
                    <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Find answers to common questions about Dharma House.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left hover:text-primary">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
