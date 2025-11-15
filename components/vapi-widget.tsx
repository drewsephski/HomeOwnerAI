'use client';

import { VapiWidget } from '@vapi-ai/client-sdk-react';
import { useState } from 'react';

interface VapiWidgetProps {
  mode?: 'voice' | 'chat';
  theme?: 'light' | 'dark';
  size?: 'tiny' | 'compact' | 'full';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export function SimpleVapiWidget({
  mode = 'chat',
  theme = 'light',
  size = 'compact',
  position = 'bottom-right',
  className = '',
}: VapiWidgetProps) {
  const [isCallActive, setIsCallActive] = useState(false);

  const handleCallStart = () => {
    console.log('Vapi call started');
    setIsCallActive(true);
  };

  const handleCallEnd = () => {
    console.log('Vapi call ended');
    setIsCallActive(false);
  };

  const handleMessage = (message: unknown) => {
    console.log('Message received:', message);
  };

  const handleError = (error: Error) => {
    console.error('Widget error:', error);
  };

  return (
    <div className={className}>
      <VapiWidget
        publicKey={process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ''}
        assistantId={process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID}
        mode={mode}
        theme={theme}
        size={size}
        position={position}
        onCallStart={handleCallStart}
        onCallEnd={handleCallEnd}
        onMessage={handleMessage}
        onError={handleError}
        // Custom styling options
        accentColor="#3B82F6"
        buttonBaseColor="#000000"
        buttonAccentColor="#FFFFFF"
        // Custom labels
        mainLabel="Chat with AI Assistant"
        startButtonText="Start Voice Chat"
        endButtonText="End Call"
        emptyChatMessage="Hi! How can I help you today?"
        emptyVoiceMessage="Click to start a voice conversation"
      />
      
      {isCallActive && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Call Active
        </div>
      )}
    </div>
  );
}
