"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Calendar, BarChart3, MessageCircle } from "lucide-react";

const Home = () => {
  const openLargeChat = () => {
    if (typeof window !== 'undefined') {
      window.openChatWidget();
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section - Calm, Confident, Direct */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pt-48 pb-12 px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading mb-6 animate-fade-in"
          >
            Never miss a call.
            <br />
            Never lose a job.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Your AI receptionist answers every call, books appointments
            instantly, and runs 24/7. Built for home service professionals who
            can&apos;t afford downtime.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4"
          >
            <Button
              onClick={openLargeChat}
              size="lg"
              className="btn-lift px-8 py-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with AI Assistant
            </Button>
            <p className="text-sm text-muted-foreground font-light">
              Get instant answers about our AI receptionist service
            </p>
          </motion.div>
        </div>  
      </motion.section>
      

      {/* Features Grid - Deliberate Spacing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-6 lg:px-8 bg-muted/30"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-center mb-16">
            Everything&apos;s handled.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-background" />
              </div>
              <h3 className="font-heading mb-3">24/7 Voice Agent</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Professional AI receptionist handles every call instantly. 
                Answers questions, provides pricing, and identifies customer needs—day or night.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-background" />
              </div>
              <h3 className="font-heading mb-3">Smart Scheduling</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Real-time calendar sync prevents double-booking. Books appointments 
                based on your availability, service duration, and customer preferences.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-background" />
              </div>
              <h3 className="font-heading mb-3">Clear Analytics</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                See calls handled, bookings made, and revenue captured. 
                Simple dashboards that show what matters.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works - Clean Steps */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-center mb-16">
            Ready in three steps
          </h2>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-heading">
                1
              </div>
              <div>
                <h3 className="font-heading mb-2">Configure your service</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Tell us your business hours, service types, and pricing. Set
                  your AI&apos;s voice style—calm, warm, or straightforward.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-heading">
                2
              </div>
              <div>
                <h3 className="font-heading mb-2">Connect your calendar</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Sync with Google Calendar or your preferred scheduling tool.
                  Relay handles the rest.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-heading">
                3
              </div>
              <div>
                <h3 className="font-heading mb-2">Start taking calls</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Your AI receptionist goes live within 48 hours. Monitor
                  everything from your dashboard.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section - Confident Close */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-6 lg:px-8 bg-foreground text-background"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading mb-6 text-background">
            Stop missing calls. Start growing.
          </h2>
          <p className="text-xl text-background/80 mb-8 font-light leading-relaxed">
            Join service professionals who never lose another job to a missed call.
          </p>
          <Button 
            asChild
            size="lg" 
            variant="secondary"
            className="btn-lift text-base px-8 py-6 bg-background text-foreground hover:bg-background/90"
          >
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-light">
            © 2025 Relay. Everything&apos;s handled.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground font-light">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
