
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { sendContactMessage, type SendContactMessageInput } from '@/ai/flows/contact-flow';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect, useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


  const form = useForm<SendContactMessageInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<SendContactMessageInput> = async (data) => {
    const result = await sendContactMessage(data);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We have received your message.",
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem with your request. Please try again.",
      });
    }
  };
    return (
        <section id="contact" className="relative py-20 md:py-32 bg-card">
          <div className="container max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-gradient">Get in Touch</h2>
              <p className="text-muted-foreground text-lg">Have a question or a message for us? We'd love to hear from you. Reach out through the form or contact us directly.</p>
              <div className="space-y-4">
                <a href="mailto:sanidhyaupadhyay04@gmail.com" className="flex items-center gap-4 text-lg group">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="group-hover:text-primary transition-colors">sanidhyaupadhyay04@gmail.com</span>
                </a>
                 <div className="flex items-center gap-4 text-lg">
                  <Phone className="h-6 w-6 text-primary" />
                  <span>+91 7489 709 344</span>
                </div>
                <div className="flex items-start gap-4 text-lg">
                   <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                   <span>Hasdeo Public School<br/>Champa, Chhattisgarh, India</span>
                 </div>
              </div>
              <div className="w-full h-80 rounded-lg overflow-hidden mt-6 shadow-lg border border-border/10">
                <Image src="https://images.unsplash.com/photo-1444558933668-ff021ea418e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjaGhhdHRpc2dhcmglMjBtYXB8ZW58MHx8fHwxNzU0OTEzMzU5fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Map" data-ai-hint="chhattisgarh map" width={600} height={400} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="relative p-8 md:p-10 rounded-xl bg-card border-border/20 shadow-2xl">
               <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary to-accent opacity-30 -z-10" />
              {isClient && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} className="text-lg py-6" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} className="text-lg py-6" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message to Dharma House..." rows={5} {...field} className="text-lg" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full transition-transform duration-300 ease-in-out hover:scale-105" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>
    );
}
