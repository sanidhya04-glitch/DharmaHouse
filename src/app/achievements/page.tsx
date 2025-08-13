import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AchievementsSection } from "@/components/achievements";

export default function AchievementsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-card text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <AchievementsSection />
            </main>
            <Footer />
        </div>
    );
}
