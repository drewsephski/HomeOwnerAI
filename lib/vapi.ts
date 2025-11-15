import Vapi from '@vapi-ai/web';

// Simplified Vapi configuration using environment variables
export const VAPI_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || '',
  workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID || '',
};

// Create a simple Vapi instance for programmatic use
export function createVapiInstance() {
  if (!VAPI_CONFIG.publicKey) {
    throw new Error('Vapi public key is not configured');
  }

  const vapi = new Vapi(VAPI_CONFIG.publicKey);

  // Basic event listeners
  vapi.on('call-start', () => {
    console.log('Vapi call started');
  });
  
  vapi.on('call-end', () => {
    console.log('Vapi call ended');
  });
  
  vapi.on('message', (message: unknown) => {
    console.log('Assistant message:', message);
  });
  
  vapi.on('error', (error: unknown) => {
    console.error('Vapi error:', error);
  });
  
  return vapi;
}

// Helper functions for common operations
export const startCall = async (vapi: Vapi, assistantConfig?: any) => {
  try {
    if (VAPI_CONFIG.workflowId) {
      // Use workflow if available
      await vapi.start({ id: VAPI_CONFIG.workflowId });
    } else if (assistantConfig) {
      // Use provided assistant config
      await vapi.start(assistantConfig);
    } else {
      // Default demo configuration
      await vapi.start({
        model: {
          provider: 'openai',
          model: 'gpt-4',
          temperature: 0.7,
        },
        firstMessage: "Hi there! I'm your AI assistant. How can I help you today?",
        voice: {
          provider: 'openai',
          voiceId: 'alloy'
        },
        firstMessageMode: 'assistant-speaks-first'
      });
    }
    return true;
  } catch (error) {
    console.error('Failed to start Vapi call:', error);
    return false;
  }
};

export const endCall = async (vapi: Vapi) => {
  try {
    await vapi.stop();
    return true;
  } catch (error) {
    console.error('Failed to end Vapi call:', error);
    return false;
  }
};
