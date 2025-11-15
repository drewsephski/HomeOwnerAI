'use client';

import { useState } from 'react';
import { SimpleVapiWidget } from './vapi-widget';
import { createVapiInstance, startCall, endCall } from '@/lib/vapi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function VapiDemo() {
  const [isProgrammaticCallActive, setIsProgrammaticCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'starting' | 'active' | 'ending'>('idle');

  const handleProgrammaticCall = async () => {
    if (isProgrammaticCallActive) {
      setCallStatus('ending');
      const vapi = createVapiInstance();
      const success = await endCall(vapi);
      if (success) {
        setIsProgrammaticCallActive(false);
        setCallStatus('idle');
      }
    } else {
      setCallStatus('starting');
      const vapi = createVapiInstance();
      
      // Custom assistant configuration
      const assistantConfig = {
        model: {
          provider: 'openai' as const,
          model: 'gpt-4',
          temperature: 0.7,
        },
        firstMessage: "Hi there! I'm your AI assistant for this demo. How can I help you today?",
        voice: {
          provider: 'openai' as const,
          voiceId: 'alloy'
        },
        firstMessageMode: 'assistant-speaks-first' as const
      };

      const success = await startCall(vapi, assistantConfig);
      if (success) {
        setIsProgrammaticCallActive(true);
        setCallStatus('active');
      } else {
        setCallStatus('idle');
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vapi Integration Demo</CardTitle>
          <CardDescription>
            Simplified Vapi setup using both widget and programmatic approaches
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Widget Approach */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Widget Approach</h3>
            <p className="text-sm text-muted-foreground">
              The simplest way to add Vapi to your site. Just include the widget component.
            </p>
            <div className="p-4 border rounded-lg bg-muted/50">
              <code className="text-sm">
                {`<SimpleVapiWidget mode=&quot;chat&quot; theme=&quot;light&quot; />`}
              </code>
            </div>
            <SimpleVapiWidget 
              mode="chat" 
              theme="light" 
              size="compact"
              className="mt-4"
            />
          </div>

          {/* Programmatic Approach */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Programmatic Approach</h3>
            <p className="text-sm text-muted-foreground">
              For more control, use the Vapi instance directly.
            </p>
            <div className="p-4 border rounded-lg bg-muted/50">
              <code className="text-sm">
                {`const vapi = createVapiInstance();
await startCall(vapi, assistantConfig);`}
              </code>
            </div>
            <Button 
              onClick={handleProgrammaticCall}
              disabled={callStatus === 'starting' || callStatus === 'ending'}
              variant={isProgrammaticCallActive ? "destructive" : "default"}
            >
              {callStatus === 'starting' && 'Starting...'}
              {callStatus === 'active' && 'End Call'}
              {callStatus === 'ending' && 'Ending...'}
              {callStatus === 'idle' && 'Start Programmatic Call'}
            </Button>
            {isProgrammaticCallActive && (
              <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800 text-sm font-medium">
                  Programmatic call is active. Check your browser&apos;s audio permissions.
                </p>
              </div>
            )}
          </div>

          {/* Environment Variables */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Environment Setup</h3>
            <p className="text-sm text-muted-foreground">
              Make sure these environment variables are set in your .env.local file:
            </p>
            <div className="p-4 border rounded-lg bg-muted/50">
              <pre className="text-sm">
{`NEXT_PUBLIC_VAPI_PUBLIC_KEY=${process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || 'your-public-key'}
NEXT_PUBLIC_VAPI_WORKFLOW_ID=${process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID || 'your-workflow-id'}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
