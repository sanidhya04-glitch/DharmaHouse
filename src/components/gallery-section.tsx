import { Gallery } from '@/components/gallery';

export function GallerySection() {
    return (
        <section id="gallery" className="relative py-20 md:py-32 bg-background">
           <div className="container max-w-7xl mx-auto">
             <div className="text-center mb-16">
               <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient">Gallery</h2>
               <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Moments of joy, teamwork, and victory captured in time.</p>
             </div>
             <Gallery />
           </div>
        </section>
    );
}
