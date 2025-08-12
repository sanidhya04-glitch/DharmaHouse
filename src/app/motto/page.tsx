import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motto } from "@/components/motto";

export default function MottoPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <Motto />
            </main>
            <Footer />
        </div>
    );
}
