import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Phone, Calendar, MessageSquare, BarChart3, Zap, Shield, Headphones } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-36 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Star className="w-4 h-4" />
              <span>48-hour implementation guaranteed</span>
            </div>
          </div>
          <h1 className="font-heading text-4xl lg:text-6xl mb-6">
            Simple pricing for 
            <span className="text-primary"> serious results</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Stop losing 30% of your business to missed calls. 
            Choose the plan that fits your service business and start capturing every opportunity.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* AI Assistant Plan */}
          <Card className="relative border-2 border-border hover:border-primary/50 transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="font-heading text-2xl mb-2">AI Assistant</CardTitle>
              <CardDescription className="text-lg font-light">
                Perfect for solo operators and small teams
              </CardDescription>
              <div className="mt-6">
                <div className="text-4xl font-bold mb-2">$400</div>
                <div className="text-muted-foreground">one-time setup</div>
                <div className="text-2xl font-bold mt-4 mb-2">$140</div>
                <div className="text-muted-foreground">per month</div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Streamlined voice agent</div>
                    <div className="text-sm text-muted-foreground">Basic call handling and routing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Business information setup</div>
                    <div className="text-sm text-muted-foreground">Services, hours, and basic pricing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Email-based booking</div>
                    <div className="text-sm text-muted-foreground">Simple appointment scheduling</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Calendar integration</div>
                    <div className="text-sm text-muted-foreground">Google Calendar basic sync</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Ongoing maintenance</div>
                    <div className="text-sm text-muted-foreground">Performance monitoring</div>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full btn-lift" variant="outline">
                <Link href="/contact">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI Receptionist Plan */}
          <Card className="relative border-2 border-primary hover:border-primary/70 transition-all duration-300 shadow-lg shadow-primary/10">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="font-heading text-2xl mb-2">AI Receptionist</CardTitle>
              <CardDescription className="text-lg font-light">
                Complete solution for growing service businesses
              </CardDescription>
              <div className="mt-6">
                <div className="text-4xl font-bold mb-2">$1,500</div>
                <div className="text-muted-foreground">one-time setup</div>
                <div className="text-2xl font-bold mt-4 mb-2">$200</div>
                <div className="text-muted-foreground">per month</div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Production-ready voice agent</div>
                    <div className="text-sm text-muted-foreground">Advanced conversation design</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Full business data ingestion</div>
                    <div className="text-sm text-muted-foreground">Complete services, pricing, and workflows</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">24/7 call handling</div>
                    <div className="text-sm text-muted-foreground">FAQs, pricing, troubleshooting</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Smart scheduling system</div>
                    <div className="text-sm text-muted-foreground">Real-time conflict prevention</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">SMS automation</div>
                    <div className="text-sm text-muted-foreground">Confirmations, reminders, rescheduling</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Advanced calendar sync</div>
                    <div className="text-sm text-muted-foreground">Google Calendar, Outlook, Office365</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Analytics dashboard</div>
                    <div className="text-sm text-muted-foreground">Calls handled, revenue captured</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Priority support</div>
                    <div className="text-sm text-muted-foreground">24/7 technical assistance</div>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full btn-lift">
                <Link href="/contact">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            Compare features
          </h2>
          <div className="bg-background rounded-lg border overflow-hidden">
            <div className="grid grid-cols-3 border-b">
              <div className="p-4 font-medium">Feature</div>
              <div className="p-4 font-medium text-center">AI Assistant</div>
              <div className="p-4 font-medium text-center">AI Receptionist</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">24/7 Call Answering</div>
              <div className="p-4 text-center">✓</div>
              <div className="p-4 text-center">✓</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Business Hours Setup</div>
              <div className="p-4 text-center">✓</div>
              <div className="p-4 text-center">✓</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Basic Service Information</div>
              <div className="p-4 text-center">✓</div>
              <div className="p-4 text-center">✓</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Advanced Conversation Design</div>
              <div className="p-4 text-center">-</div>
              <div className="p-4 text-center">✓</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Pricing & Service Details</div>
              <div className="p-4 text-center">Basic</div>
              <div className="p-4 text-center">Complete</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Appointment Booking</div>
              <div className="p-4 text-center">Email</div>
              <div className="p-4 text-center">Real-time</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">SMS Confirmations</div>
              <div className="p-4 text-center">-</div>
              <div className="p-4 text-center">✓</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Calendar Integration</div>
              <div className="p-4 text-center">Google Calendar</div>
              <div className="p-4 text-center">All major calendars</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Analytics Dashboard</div>
              <div className="p-4 text-center">Basic</div>
              <div className="p-4 text-center">Advanced</div>
            </div>
            
            <div className="grid grid-cols-3 border-b">
              <div className="p-4">Support Level</div>
              <div className="p-4 text-center">Standard</div>
              <div className="p-4 text-center">Priority</div>
            </div>
            
            <div className="grid grid-cols-3">
              <div className="p-4">Implementation Time</div>
              <div className="p-4 text-center">48 hours</div>
              <div className="p-4 text-center">48 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl mb-8">
            Return on investment
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">30%</div>
              <div className="text-muted-foreground">Increase in booked appointments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50%</div>
              <div className="text-muted-foreground">Reduction in admin time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Call answer rate</div>
            </div>
          </div>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Most customers see ROI within the first month through captured appointments 
            and reduced administrative overhead.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl mb-6">
            Ready to stop missing calls?
          </h2>
          <p className="text-xl text-background/80 mb-8 font-light leading-relaxed">
            Join home service professionals who never lose another job to a missed call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="btn-lift">
              <Link href="/contact">Start in 48 Hours</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-lift border-background text-background hover:bg-background hover:text-foreground">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
