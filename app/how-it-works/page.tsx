import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Phone, Calendar, MessageSquare, BarChart3, Zap, Settings, Users, Clock, Shield, Globe, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              <Clock className="w-4 h-4" />
              <span>48-hour implementation</span>
            </div>
          </div>
          <h1 className="font-heading text-4xl lg:text-6xl mb-6">
            How Relay 
            <span className="text-primary"> transforms your business</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            From missed calls to captured opportunities. 
            See exactly how our AI receptionist becomes your most valuable team member.
          </p>
        </div>
      </section>

      {/* System Overview */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            Complete call-to-customer system
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Inbound Call</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Customer calls your business number
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">AI Receptionist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Voice agent handles the conversation
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Smart Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Appointment scheduled in real-time
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  SMS confirmation and reminder sent
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            48-hour implementation process
          </h2>
          
          <div className="space-y-12">
            {/* Day 1 */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="font-heading text-2xl">Discovery & Configuration</h3>
                  <span className="text-sm text-muted-foreground ml-auto">Day 1</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Business Analysis</div>
                      <div className="text-sm text-muted-foreground">
                        We deep-dive into your services, pricing structure, service areas, 
                        and business hours to understand your unique operations.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Voice Personality Design</div>
                      <div className="text-sm text-muted-foreground">
                        Choose your AI's tone and style - professional and authoritative, 
                        warm and friendly, or technical and precise.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Conversation Flow Mapping</div>
                      <div className="text-sm text-muted-foreground">
                        Design customer journey scripts for common scenarios: 
                        emergency calls, routine bookings, pricing inquiries, and troubleshooting.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-4">What we need from you:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Service menu and pricing
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Business hours and availability
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Calendar access permissions
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Common customer questions
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Days 2-3 */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="font-heading text-2xl">Technical Setup & Training</h3>
                  <span className="text-sm text-muted-foreground ml-auto">Days 2-3</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Voice Agent Training</div>
                      <div className="text-sm text-muted-foreground">
                        We train the AI on your specific business data, service details, 
                        pricing information, and customer service standards.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Calendar Integration</div>
                      <div className="text-sm text-muted-foreground">
                        Connect your Google Calendar, Outlook, or Office365 with 
                        real-time sync and conflict prevention.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Communication Setup</div>
                      <div className="text-sm text-muted-foreground">
                        Configure SMS templates, email workflows, and customer 
                        communication sequences.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-4">Quality assurance testing:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Call scenario testing
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Booking flow validation
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        SMS delivery verification
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Calendar sync testing
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Day 4 */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="font-heading text-2xl">Deployment & Training</h3>
                  <span className="text-sm text-muted-foreground ml-auto">Day 4</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Go Live</div>
                      <div className="text-sm text-muted-foreground">
                        Your AI receptionist goes live with phone number provisioning, 
                        call routing setup, and system monitoring activation.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Team Training</div>
                      <div className="text-sm text-muted-foreground">
                        We train your team on dashboard usage, call monitoring, 
                        appointment management, and system optimization.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Monitoring & Optimization</div>
                      <div className="text-sm text-muted-foreground">
                        Continuous monitoring begins, with performance analytics 
                        and ongoing optimization based on real call data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-4">Post-launch support:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        30-day optimization period
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Weekly performance reviews
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        Ongoing support access
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        System fine-tuning
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            Enterprise-grade technology stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Voice Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Speech-to-text with 99% accuracy</li>
                  <li>• Natural language understanding</li>
                  <li>• Contextual conversation memory</li>
                  <li>• Human-like voice synthesis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Telephony Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 99.9% uptime guarantee</li>
                  <li>• Redundant call routing</li>
                  <li>• Global phone number support</li>
                  <li>• Call recording and logging</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Integration Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time calendar sync</li>
                  <li>• SMS gateway integration</li>
                  <li>• Email automation</li>
                  <li>• Custom API connections</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Analytics Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time call metrics</li>
                  <li>• Conversion tracking</li>
                  <li>• Revenue attribution</li>
                  <li>• Performance insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Automation Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Workflow orchestration</li>
                  <li>• Trigger-based actions</li>
                  <li>• Custom business logic</li>
                  <li>• Scheduled processes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• SOC 2 Type II certified</li>
                  <li>• GDPR and CCPA compliant</li>
                  <li>• End-to-end encryption</li>
                  <li>• Regular security audits</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-World Examples */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            See it in action
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Emergency Plumbing Call
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Customer calls about burst pipe</div>
                      <div className="text-sm text-muted-foreground">AI detects urgency, asks key questions</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Service assessment</div>
                      <div className="text-sm text-muted-foreground">AI determines emergency level and required equipment</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Immediate scheduling</div>
                      <div className="text-sm text-muted-foreground">Finds first available emergency slot</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Customer notification</div>
                      <div className="text-sm text-muted-foreground">SMS confirmation with ETA and preparation tips</div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium text-primary">Result: Emergency handled in 45 minutes</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  HVAC Maintenance Booking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Routine service inquiry</div>
                      <div className="text-sm text-muted-foreground">AI explains maintenance options and pricing</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">System type identification</div>
                      <div className="text-sm text-muted-foreground">Gathers unit details and service history</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Smart scheduling</div>
                      <div className="text-sm text-muted-foreground">Checks calendar, suggests optimal times</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">Preparation guidance</div>
                      <div className="text-sm text-muted-foreground">Sends checklist and access instructions</div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium text-primary">Result: 15-minute call, perfect booking</div>
                </div>
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
            Join hundreds of home service professionals who never miss another opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="btn-lift">
              <Link href="/setup">Start Your 48-Hour Setup</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-lift border-background text-background hover:bg-background hover:text-foreground">
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
