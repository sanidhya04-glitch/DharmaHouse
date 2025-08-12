import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EventsSection } from "@/components/events";

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <EventsSection />
            </main>
            <Footer />
        </div>
    );
}
