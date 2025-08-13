
'use client';

import { useState, useEffect } from 'react';
import { sendContactMessage } from '@/ai/flows/contact-flow';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { KeyRound, ShieldAlert, Loader2, MessageSquare, Clock, User, Mail, Trash2 } from 'lucide-react';
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

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const SECRET_CODE = 'DHARMA@2003';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Message | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
      setIsLoading(true);
      const result = await sendContactMessage({ name: 'admin', email: 'admin@local', message: 'fetch', isAdmin: true });

      if (result.success && result.messages) {
          setMessages(result.messages as Message[]);
      } else {
          setError(result.error || "Failed to fetch messages.");
      }
      setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
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
      email: 'admin@local',
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
          <section className="container max-w-7xl mx-auto">
              <div className="text-center mb-16 animate-fade-in-up">
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
                      {messages.map((msg, i) => (
                          <Card key={msg.id} className="bg-card/50 backdrop-blur-sm border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                              <CardHeader>
                                  <div className="flex justify-between items-start flex-wrap gap-4">
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
                                      <div className="flex items-center gap-4">
                                        <div className="text-right text-sm text-muted-foreground flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{formatDate(msg.createdAt)}</span>
                                        </div>
                                        <Button 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => setShowDeleteConfirm(msg)}
                                            disabled={isDeleting === msg.id}
                                            className="bg-destructive/80 hover:bg-destructive text-destructive-foreground h-10 w-10"
                                        >
                                          {isDeleting === msg.id ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                                        </Button>
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
                  <div className="text-center text-muted-foreground text-lg border-2 border-dashed border-white/10 rounded-xl p-12 bg-card/50 backdrop-blur-sm">
                      <MessageSquare className="mx-auto h-12 w-12" />
                      <p className="mt-4">No messages have been received yet.</p>
                  </div>
              )}
          </section>
        </main>
        <Footer />
      </div>
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
    </>
  );
}
