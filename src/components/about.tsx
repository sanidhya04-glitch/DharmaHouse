import Image from 'next/image';
import { Award, Users, Target } from 'lucide-react';

export function AboutSection() {
    return (
        <section id="about" className="relative py-20 md:py-32 bg-background">
          <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-2.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative">
                <Image
                  src="https://jaipuriaalambagh.com/index/wp-content/uploads/2023/12/OrangeDay2.jpeg"
                  alt="Dharma House students"
                  data-ai-hint="students teamwork"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient">About Dharma House</h2>
              <p className="text-muted-foreground text-lg">
                Established with the founding of Hasdeo Public School, Dharma House has always been a symbol of integrity, perseverance, and unity. Our name, "Dharma," signifies righteousness and duty, principles we instill in every student.
              </p>
              <p className="text-muted-foreground">
                We believe in nurturing not just academic excellence, but also character, leadership, and a spirit of healthy competition. Our members are encouraged to participate in a wide array of activities, from sports to cultural events, fostering teamwork and personal growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="text-center p-6 rounded-lg bg-card border border-border/20 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
                  <Users className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="font-bold text-lg mt-3">Teamwork</h3>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border/20 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
                  <Target className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="font-bold text-lg mt-3">Discipline</h3>
                </div>
                <div className="text-center p-6 rounded-lg bg-card border border-border/20 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2">
                  <Award className="mx-auto h-10 w-10 text-primary" />
                  <h3 className="font-bold text-lg mt-3">Leadership</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}
