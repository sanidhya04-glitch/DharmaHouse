
'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book, Film, Lightbulb, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, type DocumentData } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const iconMap: { [key: string]: React.ElementType } = {
    book: Book,
    film: Film,
    lightbulb: Lightbulb,
};

interface Resource {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: string;
}

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const db = getFirestore(app);
                const resourcesCollection = collection(db, 'resources');
                const querySnapshot = await getDocs(resourcesCollection);
                const resourcesData = querySnapshot.docs.map((doc: DocumentData) => ({
                    id: doc.id,
                    ...doc.data(),
                } as Resource));
                setResources(resourcesData);
            } catch (error) {
                console.error("Error fetching resources:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section id="resources" className="relative py-20 md:py-32 bg-background">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">Student Resources</h2>
                            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Helpful resources for the members of Dharma House.</p>
                        </div>
                        {loading ? (
                             <div className="flex justify-center items-center">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                             </div>
                        ) : resources.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-8">
                                {resources.map((resource) => {
                                    const IconComponent = iconMap[resource.icon.toLowerCase()] || Book;
                                    return (
                                        <Card key={resource.id} className="p-6 text-center">
                                            <CardContent className="flex flex-col items-center">
                                                <IconComponent className="h-12 w-12 text-primary mb-4" />
                                                <CardTitle className="font-headline text-2xl mb-2">{resource.title}</CardTitle>
                                                <p className="text-muted-foreground mb-4">{resource.description}</p>
                                                <Button asChild>
                                                    <Link href={resource.link} target="_blank" rel="noopener noreferrer">Access Now</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground text-lg">
                                <p>No student resources are available at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
