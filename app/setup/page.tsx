import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, Zap, ArrowRight } from "lucide-react";

export default function Setup() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-36 px-6 lg:px-8">
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
            <Button asChild size="lg" className="btn-lift">
              <Link href="/contact">Start Your Setup</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-lift">
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Simple 3-Step Process */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl text-center mb-12">
            Your 48-hour onboarding journey
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <CardTitle className="text-xl mb-2">Discovery Call</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  30-minute call to understand your business needs and configure your AI receptionist
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Clock className="w-4 h-4" />
                  <span>Day 1 - 1 hour</span>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <CardTitle className="text-xl mb-2">AI Setup & Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We configure your voice agent, integrate with your systems, and conduct thorough testing
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Clock className="w-4 h-4" />
                  <span>Day 1-2 - 4-6 hours</span>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <CardTitle className="text-xl mb-2">Go Live</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your AI receptionist goes live and starts handling calls immediately
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary">
                  <Clock className="w-4 h-4" />
                  <span>Day 2 - 30 minutes</span>
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
            We handle everything
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Voice Agent Development</h4>
                <p className="text-sm text-muted-foreground">Custom AI trained for your business</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Phone System Integration</h4>
                <p className="text-sm text-muted-foreground">Seamless setup with your existing number</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-medium mb-1">CRM Integration</h4>
                <p className="text-sm text-muted-foreground">Connect with your customer management system</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-medium mb-1">24/7 Monitoring</h4>
                <p className="text-sm text-muted-foreground">Ongoing support and optimization</p>
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl mb-6">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-background/80 mb-8 font-light leading-relaxed">
            Start capturing every call and booking more appointments in just 48 hours.
          </p>
          <Button asChild size="lg" variant="secondary" className="btn-lift">
            <Link href="/contact">
              Start Your Setup Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}