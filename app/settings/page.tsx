import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-4xl mb-2">Settings</h1>
            <p className="text-muted-foreground font-light">
              Configure your AI receptionist and service details
            </p>
          </div>

          <Tabs defaultValue="voice" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
              <TabsTrigger value="service">Service Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            {/* Voice Settings */}
            <TabsContent value="voice">
              <Card className="p-8 border border-border">
                <h2 className="font-heading text-2xl mb-6">Voice Configuration</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="voice-style" className="text-base font-light mb-3 block">
                      Voice Style
                    </Label>
                    <Select defaultValue="calm">
                      <SelectTrigger id="voice-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calm">Calm & Steady</SelectItem>
                        <SelectItem value="warm">Warm & Friendly</SelectItem>
                        <SelectItem value="direct">Direct & Efficient</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground font-light mt-2">
                      Choose the personality that best represents your business
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="greeting" className="text-base font-light mb-3 block">
                      Custom Greeting
                    </Label>
                    <Input 
                      id="greeting"
                      placeholder="Thank you for calling [Business Name]. How can I help you today?"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="business-name" className="text-base font-light mb-3 block">
                      Business Name
                    </Label>
                    <Input 
                      id="business-name"
                      placeholder="Your Business Name"
                      className="font-light"
                    />
                  </div>

                  <Button className="btn-lift">Save Voice Settings</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Service Details */}
            <TabsContent value="service">
              <Card className="p-8 border border-border">
                <h2 className="font-heading text-2xl mb-6">Service Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="service-area" className="text-base font-light mb-3 block">
                      Service Area
                    </Label>
                    <Input 
                      id="service-area"
                      placeholder="e.g., Portland Metro Area"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service-types" className="text-base font-light mb-3 block">
                      Service Types (comma separated)
                    </Label>
                    <Input 
                      id="service-types"
                      placeholder="HVAC, Plumbing, Electrical, Emergency Services"
                      className="font-light"
                    />
                  </div>

                  <div>
                    <Label htmlFor="avg-job-duration" className="text-base font-light mb-3 block">
                      Average Job Duration
                    </Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="avg-job-duration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="emergency" className="text-base font-light mb-3 block">
                      Emergency Handling
                    </Label>
                    <Select defaultValue="priority">
                      <SelectTrigger id="emergency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority">Prioritize immediately</SelectItem>
                        <SelectItem value="schedule">Add to schedule</SelectItem>
                        <SelectItem value="custom">Custom routing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="btn-lift">Save Service Details</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Schedule Settings */}
            <TabsContent value="schedule">
              <Card className="p-8 border border-border">
                <h2 className="font-heading text-2xl mb-6">Availability</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-light mb-4 block">
                      Business Hours
                    </Label>
                    <div className="space-y-4">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                        <div key={day} className="flex items-center gap-4">
                          <span className="w-28 text-sm font-light">{day}</span>
                          <Input 
                            type="time" 
                            defaultValue="09:00"
                            className="font-light w-32"
                          />
                          <span className="text-muted-foreground">to</span>
                          <Input 
                            type="time" 
                            defaultValue="17:00"
                            className="font-light w-32"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="booking-buffer" className="text-base font-light mb-3 block">
                      Booking Buffer Time
                    </Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="booking-buffer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground font-light mt-2">
                      Time buffer between appointments
                    </p>
                  </div>

                  <Button className="btn-lift">Save Schedule Settings</Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
