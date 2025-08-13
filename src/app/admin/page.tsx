
'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, ShieldAlert, Loader2, MessageSquare, Clock, User, Mail } from 'lucide-react';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Timestamp;
};

const SECRET_CODE = 'DHARMA@2003';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const db = getFirestore(app);
      const messagesCollection = collection(db, 'contacts');
      const q = query(messagesCollection, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Message));
        setMessages(msgs);
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });

      return () => unsubscribe();
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
  
  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'No date';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-20">
          <Card className="w-full max-w-md mx-4 shadow-2xl bg-card border-border/20">
            <CardHeader className="text-center">
              <KeyRound className="mx-auto h-12 w-12 text-primary" />
              <CardTitle className="font-headline text-3xl mt-4">Admin Access</CardTitle>
              <CardDescription>Please enter the secret code to view messages.</CardDescription>
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
                    <div className="flex items-center gap-2 text-destructive text-sm font-medium">
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
    <div className="flex flex-col min-h-dvh bg-background text-foreground dark">
      <Header />
      <main className="flex-1 pt-28">
        <section className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-gradient">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">
                    Viewing all messages sent via the contact form.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : messages.length > 0 ? (
                <div className="space-y-8">
                    {messages.map((msg) => (
                        <Card key={msg.id} className="bg-card/50 border-border/20 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                                            <User className="text-primary" /> 
                                            {msg.name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-3 mt-2 text-muted-foreground">
                                            <Mail className="h-4 w-4 text-primary/80" />
                                            {msg.email}
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
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center text-muted-foreground text-lg border-2 border-dashed border-border/30 rounded-xl p-12">
                    <MessageSquare className="mx-auto h-12 w-12" />
                    <p className="mt-4">No messages have been received yet.</p>
                </div>
            )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
