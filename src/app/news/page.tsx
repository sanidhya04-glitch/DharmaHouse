
'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { manageNews, type NewsArticle } from '@/ai/flows/news-flow';
import { Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function NewsPage() {
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            const result = await manageNews({ action: 'fetch' });
            if (result.success && result.articles) {
                setNewsArticles(result.articles);
            }
            setIsLoading(false);
        };
        fetchArticles();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
            <Header />
            <main className="flex-1 pt-20">
                <section id="news" className="relative py-20 md:py-32 bg-background">
                    <div className="container max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient">News & Updates</h2>
                            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">Stay updated with the latest happenings in Dharma House.</p>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                            </div>
                        ) : newsArticles.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {newsArticles.map((article, index) => (
                                    <Card key={index} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-border/10 bg-card/50 backdrop-blur-sm">
                                        {article.imageUrl && (
                                            <CardHeader className="p-0">
                                                <Image 
                                                    src={article.imageUrl} 
                                                    alt={article.title} 
                                                    data-ai-hint={article.imageHint || 'news article'}
                                                    width={600} 
                                                    height={400} 
                                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                                                />
                                            </CardHeader>
                                        )}
                                        <CardContent className="p-6">
                                            <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
                                            <CardDescription className="text-muted-foreground mt-2">{formatDate(article.createdAt)}</CardDescription>
                                            <p className="mt-4 text-muted-foreground line-clamp-3">{article.content}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground text-lg border-2 border-dashed border-white/10 rounded-xl p-12 bg-card/50 backdrop-blur-sm">
                                <Newspaper className="mx-auto h-12 w-12" />
                                <p className="mt-4">There are no news updates at the moment. Please check back later!</p>
                                <p className="text-sm mt-2">Admins can post news from the <Link href="/admin" className="text-primary underline">admin dashboard</Link>.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
