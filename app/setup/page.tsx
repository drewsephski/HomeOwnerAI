import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Users, Settings, Phone, Calendar, MessageSquare, ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function Setup() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Zap className="w-4 h-4" />
              <span>48-hour implementation guaranteed</span>
            </div>
          </div>
          <h1 className="font-heading text-4xl lg:text-6xl mb-6">
            Get started in 
            <span className="text-primary"> 48 hours</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-8">
            From discovery to deployment. We handle everything so you can focus on serving customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-lift">
              Start Your Setup
            </Button>
            <Button size="lg" variant="outline" className="btn-lift">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            Your 48-hour implementation timeline
          </h2>
          
          <div className="space-y-8">
            {/* Day 1 */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-heading text-2xl">Discovery & Configuration</h3>
                  <p className="text-muted-foreground">Day 1 - 4-6 hours</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 ml-16">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Business Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Service catalog and pricing structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Business hours and availability rules</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Service areas and travel preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Common customer questions and scenarios</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Voice & Workflow Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Voice personality and tone selection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Conversation flow mapping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Emergency vs routine call handling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Custom business logic and rules</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Days 2-3 */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-heading text-2xl">Technical Setup & Training</h3>
                  <p className="text-muted-foreground">Days 2-3 - 8-12 hours</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 ml-16">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="w-5 h-5 text-primary" />
                      Voice Agent Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>AI model training with your business data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Service knowledge base creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Pricing and service detail integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Quality assurance and testing</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      System Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Calendar system connection and testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>SMS gateway setup and template creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Phone number provisioning and routing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Analytics dashboard configuration</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Day 4 */}
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-heading text-2xl">Deployment & Training</h3>
                  <p className="text-muted-foreground">Day 4 - 2-4 hours</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 ml-16">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Go Live
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Final system testing and validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Phone number activation and call routing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Monitoring systems activation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Customer notification setup</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Team Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Dashboard navigation and monitoring</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Appointment management workflow</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Call review and optimization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>Ongoing support and maintenance</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Need From You */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            What we need from you
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Before we start
                </CardTitle>
                <CardDescription>
                  Prepare these items to accelerate your setup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Business Information</div>
                    <div className="text-sm text-muted-foreground">
                      Services offered, pricing structure, service areas
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Availability Schedule</div>
                    <div className="text-sm text-muted-foreground">
                      Business hours, emergency availability, booking windows
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Calendar Access</div>
                    <div className="text-sm text-muted-foreground">
                      Google Calendar, Outlook, or preferred scheduling system
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                    4
                  </div>
                  <div>
                    <div className="font-medium">Common Questions</div>
                    <div className="text-sm text-muted-foreground">
                      Frequently asked questions and troubleshooting scenarios
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Technical requirements
                </CardTitle>
                <CardDescription>
                  Simple setup, no technical expertise needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Business Phone Number</div>
                    <div className="text-sm text-muted-foreground">
                      Existing number or we can provide a new one
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Calendar System</div>
                    <div className="text-sm text-muted-foreground">
                      Google Calendar, Outlook, or Office365 access
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Basic Computer Access</div>
                    <div className="text-sm text-muted-foreground">
                      For dashboard and analytics access
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">Team Availability</div>
                    <div className="text-sm text-muted-foreground">
                      2-4 hours for training and go-live support
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            What we handle for you
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Voice Agent Development</h3>
                <p className="text-sm text-muted-foreground">
                  Complete AI training and deployment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Calendar Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Setup and testing with your system
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">SMS Automation</h3>
                <p className="text-sm text-muted-foreground">
                  Templates and workflow configuration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Custom Workflows</h3>
                <p className="text-sm text-muted-foreground">
                  Business-specific logic and rules
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Team Training</h3>
                <p className="text-sm text-muted-foreground">
                  Complete setup and workflow education
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-medium mb-2">Ongoing Support</h3>
                <p className="text-sm text-muted-foreground">
                  30-day optimization and fine-tuning
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            Choose your plan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="font-heading text-2xl">AI Assistant</CardTitle>
                <CardDescription className="text-lg font-light">
                  For solo operators
                </CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold">$400</div>
                  <div className="text-muted-foreground">setup + $140/month</div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full btn-lift" variant="outline">
                  <Link href="/pricing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary hover:border-primary/70 transition-all duration-300 shadow-lg shadow-primary/10">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
                <CardTitle className="font-heading text-2xl">AI Receptionist</CardTitle>
                <CardDescription className="text-lg font-light">
                  Complete solution
                </CardDescription>
                <div className="mt-4">
                  <div className="text-3xl font-bold">$1,500</div>
                  <div className="text-muted-foreground">setup + $200/month</div>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full btn-lift">
                  <Link href="/pricing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-background/80 mb-8 font-light leading-relaxed">
            Start capturing every call and booking more appointments in just 48 hours.
          </p>
          <Button size="lg" variant="secondary" className="btn-lift">
            Start Your Setup Now
          </Button>
        </div>
      </section>
    </div>
  );
}