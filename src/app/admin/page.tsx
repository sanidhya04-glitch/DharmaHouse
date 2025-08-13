
'use client';

import { useState, useEffect, useMemo } from 'react';
import { sendContactMessage } from '@/ai/flows/contact-flow';
import { manageNews, type NewsArticle, type ManageNewsInput } from '@/ai/flows/news-flow';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, ShieldAlert, Loader2, MessageSquare, Clock, User, Trash2, Search, Inbox, BookMarked, Users, Newspaper, PlusCircle, Reply } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type Message = {
  id: string;
  name: string;
  classAndSection: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
};

const SECRET_CODE = 'DHARMA@2003';

const newsFormSchema = z.object({
  article: z.object({
    title: z.string().min(1, "Title is required."),
    content: z.string().min(1, "Content is required."),
    imageUrl: z.string().url().optional().or(z.literal('')),
    imageHint: z.string().optional(),
  }),
});
type NewsFormValues = z.infer<typeof newsFormSchema>;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDeletingNews, setIsDeletingNews] = useState<string | null>(null);
  const [isTogglingRead, setIsTogglingRead] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Message | null>(null);
  const [showDeleteNewsConfirm, setShowDeleteNewsConfirm] = useState<NewsArticle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchMessages = async () => {
    setIsLoading(true);
    const result = await sendContactMessage({ name: 'admin', message: 'fetch', isAdmin: true });

    if (result.success && result.messages) {
      setMessages(result.messages as Message[]);
    } else {
      setError(result.error || "Failed to fetch messages.");
      toast({
        variant: 'destructive',
        title: 'Error fetching messages',
        description: result.error || 'There was an issue loading messages from the database. Make sure your Firestore security rules are configured correctly for server-side access.',
      });
    }
    setIsLoading(false);
  };
  
  const fetchNews = async () => {
      const result = await manageNews({ action: 'fetch' });
      if (result.success && result.articles) {
          setNews(result.articles);
      } else {
          toast({ variant: 'destructive', title: 'Error', description: result.error || "Failed to fetch news." });
      }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
      fetchNews();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (inputCode === SECRET_CODE) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect secret code. Please try again.');
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date';
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async (messageId: string) => {
    setIsDeleting(messageId);
    const result = await sendContactMessage({
      name: 'admin',
      message: 'delete',
      isAdmin: true,
      messageIdToDelete: messageId,
    });

    if (result.success && result.messages) {
      setMessages(result.messages as Message[]);
      toast({
        title: "Message Deleted",
        description: "The message has been successfully deleted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to delete the message.",
      });
    }
    setIsDeleting(null);
    setShowDeleteConfirm(null);
  };
  
  const handleDeleteNews = async (articleId: string) => {
    setIsDeletingNews(articleId);
    const result = await manageNews({
      action: 'delete',
      articleIdToDelete: articleId,
    });

    if (result.success && result.articles) {
      setNews(result.articles);
      toast({
        title: "News Article Deleted",
        description: "The news article has been successfully deleted.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to delete the news article.",
      });
    }
    setIsDeletingNews(null);
    setShowDeleteNewsConfirm(null);
  };

  const handleToggleRead = async (messageId: string) => {
    setIsTogglingRead(messageId);
    const result = await sendContactMessage({
      name: 'admin',
      message: 'toggle read',
      isAdmin: true,
      messageIdToToggleRead: messageId,
    });

    if (result.success && result.messages) {
      setMessages(result.messages as Message[]);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Failed to update the message status.",
      });
    }
    setIsTogglingRead(null);
  };

  const filteredMessages = useMemo(() => {
    return messages.filter(msg =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.classAndSection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

  const stats = useMemo(() => {
    const totalMessages = messages.length;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newLast7Days = messages.filter(msg => new Date(msg.createdAt) > sevenDaysAgo).length;
    return { totalMessages, newLast7Days, totalNews: news.length };
  }, [messages, news]);

  const newsForm = useForm<NewsFormValues>({
      resolver: zodResolver(newsFormSchema),
      defaultValues: { article: { title: "", content: "", imageUrl: "", imageHint: "" } },
  });

  const onNewsSubmit: SubmitHandler<NewsFormValues> = async (data) => {
      const result = await manageNews({ action: 'create', article: data.article });
      if (result.success && result.articles) {
          setNews(result.articles);
          toast({ title: "News Published", description: "The new article is now live." });
          newsForm.reset();
      } else {
          toast({ variant: "destructive", title: "Error", description: result.error || "Failed to publish news." });
      }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20 bg-grid-white/[0.05]">
          <Card className="w-full max-w-md mx-4 shadow-2xl bg-card/80 backdrop-blur-sm border-white/10 animate-fade-in-up">
            <CardHeader className="text-center">
              <div className="mx-auto w-fit p-4 bg-primary/10 rounded-full border border-primary/20 shadow-inner">
                <KeyRound className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="font-headline text-3xl mt-4">Admin Access</CardTitle>
              <CardDescription>Please enter the secret code to view the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Secret Code"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="text-lg py-6 text-center"
                />
                <Button onClick={handleLogin} className="w-full" size="lg">
                  Unlock
                </Button>
                {error && (
                    <div className="flex items-center gap-2 text-destructive text-sm font-medium p-3 bg-destructive/10 rounded-md border border-destructive/20">
                        <ShieldAlert className="h-4 w-4" />
                        <p>{error}</p>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
        <Header />
        <main className="flex-1 pt-28 bg-grid-white/[0.05]">
          <section className="container max-w-7xl mx-auto space-y-12">
              <div className="text-center mb-12 animate-fade-in-up">
                  <h1 className="font-headline text-4xl md:text-5xl font-bold text-gradient">Admin Dashboard</h1>
                  <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">
                      Manage messages and site content.
                  </p>
              </div>

              {/* Stats and Search Section */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border-white/10 shadow-lg">
                  <CardHeader>
                    <CardTitle>Site Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-primary">{stats.totalMessages}</p>
                      <p className="text-muted-foreground">Total Messages</p>
                    </div>
                     <div>
                      <p className="text-3xl font-bold text-primary">{stats.newLast7Days}</p>
                      <p className="text-muted-foreground">New This Week</p>
                    </div>
                     <div>
                      <p className="text-3xl font-bold text-primary">{stats.totalNews}</p>
                      <p className="text-muted-foreground">Total News</p>
                    </div>
                  </CardContent>
                </Card>
                 <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg">
                   <CardHeader>
                    <CardTitle>Search Messages</CardTitle>
                  </CardHeader>
                   <CardContent>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="Filter by name, class..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                   </CardContent>
                 </Card>
              </div>

              {/* News Management Section */}
              <Card className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-3xl">
                        <Newspaper className="h-8 w-8 text-primary" />
                        News & Announcements
                    </CardTitle>
                    <CardDescription>Create and manage news articles for the website.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-xl mb-4 text-primary">Create New Article</h3>
                         <Form {...newsForm}>
                            <form onSubmit={newsForm.handleSubmit(onNewsSubmit)} className="space-y-4">
                                <FormField control={newsForm.control} name="article.title" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl><Input placeholder="Article Title" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={newsForm.control} name="article.content" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl><Textarea placeholder="Write the article content here..." rows={4} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={newsForm.control} name="article.imageUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL (Optional)</FormLabel>
                                        <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={newsForm.control} name="article.imageHint" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image AI Hint (Optional)</FormLabel>
                                        <FormControl><Input placeholder="e.g. school event" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <Button type="submit" disabled={newsForm.formState.isSubmitting} className="w-full">
                                    {newsForm.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin"/> : <PlusCircle className="h-4 w-4" />}
                                    <span>Publish Article</span>
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div>
                        <h3 className="font-bold text-xl mb-4 text-primary">Published Articles</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                            {news.length > 0 ? news.map(article => (
                                <div key={article.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-card border">
                                    <div>
                                        <p className="font-semibold">{article.title}</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(article.createdAt)}</p>
                                    </div>
                                    <Button variant="destructive" size="icon" onClick={() => setShowDeleteNewsConfirm(article)} disabled={isDeletingNews === article.id}>
                                        {isDeletingNews === article.id ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                </div>
                            )) : <p className="text-muted-foreground text-center py-8">No news articles yet.</p>}
                        </div>
                    </div>
                </CardContent>
              </Card>

              {/* Messages Section */}
              <div className="space-y-8">
                  <h2 className="font-headline text-3xl text-center text-gradient">Contact Messages</h2>
                  {isLoading ? (
                      <div className="flex justify-center items-center h-64">
                          <Loader2 className="h-12 w-12 text-primary animate-spin" />
                      </div>
                  ) : filteredMessages.length > 0 ? (
                      filteredMessages.map((msg, i) => (
                          <Card key={msg.id} className={`bg-card/50 backdrop-blur-sm border-l-4 ${msg.isRead ? 'border-card' : 'border-primary'} shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                              <CardHeader>
                                  <div className="flex justify-between items-start flex-wrap gap-4">
                                      <div>
                                          <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                                              <User className="text-primary" /> 
                                              {msg.name}
                                          </CardTitle>
                                          <CardDescription className="flex items-center gap-3 mt-2 text-muted-foreground">
                                              <Users className="h-4 w-4 text-primary/80" />
                                              {msg.classAndSection}
                                          </CardDescription>
                                      </div>
                                      <div className="text-right text-sm text-muted-foreground flex items-center gap-2">
                                          <Clock className="h-4 w-4" />
                                          <span>{formatDate(msg.createdAt)}</span>
                                      </div>
                                  </div>
                              </CardHeader>
                              <CardContent className="mt-4">
                                  <div className="prose prose-invert max-w-none text-lg text-foreground/80 flex items-start gap-4">
                                      <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                      <p className="m-0">{msg.message}</p>
                                  </div>
                                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-end items-center gap-3">
                                      <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleToggleRead(msg.id)}
                                          disabled={isTogglingRead === msg.id}
                                          className="flex items-center gap-2"
                                      >
                                          {isTogglingRead === msg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookMarked className="h-4 w-4" />}
                                          <span>{msg.isRead ? 'Mark as Unread' : 'Mark as Read'}</span>
                                      </Button>
                                      <Button 
                                          variant="destructive" 
                                          size="sm"
                                          onClick={() => setShowDeleteConfirm(msg)}
                                          disabled={isDeleting === msg.id}
                                          className="bg-destructive/80 hover:bg-destructive text-destructive-foreground flex items-center gap-2"
                                      >
                                        {isDeleting === msg.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                        <span>Delete</span>
                                      </Button>
                                  </div>
                              </CardContent>
                          </Card>
                      ))
                  ) : (
                      <div className="text-center text-muted-foreground text-lg border-2 border-dashed border-white/10 rounded-xl p-12 bg-card/50 backdrop-blur-sm">
                          <Inbox className="mx-auto h-12 w-12" />
                          <p className="mt-4">{searchTerm ? "No messages match your search." : "No messages have been received yet."}</p>
                      </div>
                  )}
              </div>
          </section>
        </main>
        <Footer />
      </div>

      {/* Message Delete Dialog */}
      <AlertDialog open={!!showDeleteConfirm} onOpenChange={(open) => !open && setShowDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message from
              <span className="font-semibold text-primary"> {showDeleteConfirm?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirm(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteConfirm && handleDelete(showDeleteConfirm.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* News Delete Dialog */}
      <AlertDialog open={!!showDeleteNewsConfirm} onOpenChange={(open) => !open && setShowDeleteNewsConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the news article titled
              <span className="font-semibold text-primary"> "{showDeleteNewsConfirm?.title}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteNewsConfirm(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => showDeleteNewsConfirm && handleDeleteNews(showDeleteNewsConfirm.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
