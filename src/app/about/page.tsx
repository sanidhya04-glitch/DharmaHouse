import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/about";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
}
