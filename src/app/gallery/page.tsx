import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GallerySection } from "@/components/gallery-section";

export default function GalleryPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <GallerySection />
            </main>
            <Footer />
        </div>
    );
}
