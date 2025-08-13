import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

const newsArticles: any[] = [];

export default function NewsPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section id="news" className="relative py-20 md:py-32 bg-background">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary">News & Updates</h2>
                            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Stay updated with the latest happenings in Dharma House.</p>
                        </div>
                        {newsArticles.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                {newsArticles.map((article, index) => (
                                    <Card key={index} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-border/10">
                                        <CardHeader className="p-0">
                                            <Image src={article.image} alt={article.title} data-ai-hint={article.hint} width={600} height={400} className="w-full h-64 object-cover" />
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
                                            <CardDescription className="text-muted-foreground mt-2">{article.date}</CardDescription>
                                            <p className="mt-4 text-muted-foreground">{article.excerpt}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground text-lg">
                                <p>There are no news updates at the moment. Please check back later!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
