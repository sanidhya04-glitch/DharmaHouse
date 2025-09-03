import Image from 'next/image';

export function AboutSection() {
    return (
        <section id="about" className="relative py-20 md:py-32 bg-secondary">
          <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient-light">More Than a Team — <br /> We Are a <span className="text-primary">Family</span>.</h2>
              <p className="text-muted-foreground text-lg">
                Dharma House is built on a foundation of integrity, perseverance, and unity. We champion the ideals of <span className="text-primary font-semibold">discipline</span>, nurture an unbreakable <span className="text-primary font-semibold">spirit</span>, and foster the next generation of <span className="text-primary font-semibold">leadership</span>.
              </p>
              <p className="text-muted-foreground">
                Our house is a place where character is forged, where healthy competition thrives, and where every member is supported to achieve their absolute best, both in academics and in life.
              </p>
            </div>
             <div className="relative group">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="A group of students working together"
                  data-ai-hint="students teamwork"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
                 <div className="absolute -inset-2.5 bg-gradient-to-r from-primary to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt -z-10"></div>
              </div>
            </div>
          </div>
        </section>
    );
}
