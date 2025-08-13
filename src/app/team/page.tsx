import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Team } from "@/components/team";

export default function TeamPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-card text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <Team />
            </main>
            <Footer />
        </div>
    );
}
