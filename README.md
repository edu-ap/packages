![hero](assets/hero.png)

# ElevenLabs Agents SDK

Build powerful conversational applications with [ElevenLabs Conversational AI platform](https://elevenlabs.io/docs/agents-platform/overview). Our SDKs provide seamless integration with popular JavaScript/TypeScript frameworks, enabling you to create multimodal AI-powered conversational agents.

[![npm version](https://img.shields.io/npm/v/@elevenlabs/client)](https://www.npmjs.com/package/@elevenlabs/client)
[![npm version](https://img.shields.io/npm/v/@elevenlabs/react)](https://www.npmjs.com/package/@elevenlabs/react)
[![npm version](https://img.shields.io/npm/v/@elevenlabs/react-native)](https://www.npmjs.com/package/@elevenlabs/react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/elevenlabs/packages)

## Overview

The ElevenLabs Agents SDKs provide a unified interface for integrating multimodal agentic capabilities into your applications.

### Available Packages

| Package                                               | Description                                               | Version                                                                                                                               |
| ----------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [`@elevenlabs/client`](#elevenlabsclient)             | Core TypeScript/JavaScript client for browser and Node.js | [![npm](https://img.shields.io/npm/v/@elevenlabs/client)](https://www.npmjs.com/package/@elevenlabs/client)                           |
| [`@elevenlabs/react`](#elevenlabsreact)               | React hooks and components for web applications           | [![npm](https://img.shields.io/npm/v/@elevenlabs/react)](https://www.npmjs.com/package/@elevenlabs/react)                             |
| [`@elevenlabs/react-native`](#elevenlabsreact-native) | React Native SDK for iOS and Android applications         | [![npm](https://img.shields.io/npm/v/@elevenlabs/react-native)](https://www.npmjs.com/package/@elevenlabs/react-native)               |
| [`@elevenlabs/convai-widget-core`](#widgets)          | Core widget library for embedding Agents                  | [![npm](https://img.shields.io/npm/v/@elevenlabs/convai-widget-core)](https://www.npmjs.com/package/@elevenlabs/convai-widget-core)   |
| [`@elevenlabs/convai-widget-embed`](#widgets)         | Pre-bundled widget for easy embedding                     | [![npm](https://img.shields.io/npm/v/@elevenlabs/convai-widget-embed)](https://www.npmjs.com/package/@elevenlabs/convai-widget-embed) |
| [`@elevenlabs/convai-cli`](#agents-cli)               | CLI tool for managing agents as code                      | [![npm](https://img.shields.io/npm/v/@elevenlabs/convai-cli)](https://www.npmjs.com/package/@elevenlabs/convai-cli)                   |

## Quick Start

### Installation

```bash
# For React applications
npm install @elevenlabs/react
# or
yarn add @elevenlabs/react
# or
pnpm add @elevenlabs/react

# For vanilla JavaScript/TypeScript
npm install @elevenlabs/client
# or
yarn add @elevenlabs/client
# or
pnpm add @elevenlabs/client

# For React Native applications
npm install @elevenlabs/react-native
# or
yarn add @elevenlabs/react-native
# or
pnpm add @elevenlabs/react-native
```

### Basic Usage

#### React Example

```tsx
import { useConversation } from "@elevenlabs/react";

function ConversationalComponent() {
  const { startSession, endSession, status } = useConversation({
    agentId: "your-agent-id",
    onConnect: ({ conversationId }) =>
      console.log("Connected:", conversationId),
    onMessage: ({ message, source }) => console.log(`${source}: ${message}`),
    onError: (message: string) => console.error("Error:", message),
  });

  return (
    <div>
      <button onClick={startSession}>Start Conversation</button>
      <button onClick={endSession}>End Conversation</button>
      <p>Status: {status}</p>
    </div>
  );
}
```

#### TypeScript/JavaScript Example

```typescript
import { Conversation, ConversationConfig } from "@elevenlabs/client";

const config: ConversationConfig = {
  agentId: "your-agent-id",
};

const conversation = new Conversation(config);

// Set up event handlers
conversation.on("connect", ({ conversationId }) => {
  console.log("Connected to agent:", conversationId);
});

conversation.on("message", ({ message, source }) => {
  console.log(`${source}: ${message}`);
});

conversation.on("error", (message: string) => {
  console.error("Error:", message);
});

// Start the conversation
const conversationId = await conversation.startSession();

// Send a text message (for text conversations)
await conversation.sendUserMessage("Hello, how can you help me?");

// End the conversation
await conversation.endSession();
```

#### React Native Example

```tsx
import { useConversation } from "@elevenlabs/react-native";
import { View, Button, Text } from "react-native";

function ConversationScreen() {
  const conversation = useConversation({
    onConnect: ({ conversationId }) =>
      console.log("Connected:", conversationId),
    onMessage: ({ message, source }) => console.log(`${source}: ${message}`),
    onError: (message: string) => console.error("Error:", message),
  });

  const handleStart = () => {
    conversation.startSession({ agentId: "your-agent-id" });
  };

  return (
    <View>
      <Button title="Start Conversation" onPress={handleStart} />
      <Button title="End Conversation" onPress={conversation.endSession} />
      <Text>Status: {conversation.status}</Text>
    </View>
  );
}
```

## Package Details

### @elevenlabs/client

The core TypeScript/JavaScript client provides the foundation.

#### Features

- **Real-time Conversations**: WebRTC-based audio streaming for low-latency conversations
- **Event-driven Architecture**: Comprehensive event system for conversation lifecycle management
- **Client Tools**: Support for custom client-side tools and functions
- **Flexible Authentication**: Support for both public and private agent configurations
- **Audio Controls**: Fine-grained control over audio input/output devices

#### Installation

```bash
npm install @elevenlabs/client
```

### @elevenlabs/react

React hooks and components for building multimodal agents with React/Next.JS

#### Installation

```bash
npm install @elevenlabs/react
```

#### Advanced Usage

```tsx
import { useConversation } from "@elevenlabs/react";
import { useEffect, useState } from "react";

function VoiceAssistant() {
  const [transcript, setTranscript] = useState<string[]>([]);

  const {
    startSession,
    endSession,
    status,
    isSpeaking,
    mode,
    getOutputVolume,
    setVolume,
  } = useConversation({
    agentId: process.env.REACT_APP_AGENT_ID!,
    onConnect: ({ conversationId }) => {
      console.log("Connected to AI assistant:", conversationId);
    },
    onMessage: ({ message, source }) => {
      setTranscript(prev => [
        ...prev,
        `${source === "ai" ? "Agent" : "You"}: ${message}`,
      ]);
    },
    onError: (message: string) => {
      console.error("Conversation error:", message);
    },
    clientTools: {
      updateUI: (data: any) => {
        // Handle UI updates from agent
        console.log("UI Update:", data);
        return { success: true };
      },
    },
  });

  return (
    <div className="voice-assistant">
      <div className="status">
        <span>Status: {status}</span>
        {mode === "listening" && <span>🎤 Listening...</span>}
        {isSpeaking && <span>🔊 Speaking...</span>}
      </div>

      <div className="controls">
        <button
          onClick={status === "connected" ? endSession : startSession}
          disabled={status === "connecting"}
        >
          {status === "connected" ? "End" : "Start"} Conversation
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0.8"
          onChange={e => setVolume({ volume: parseFloat(e.target.value) })}
        />
      </div>

      <div className="transcript">
        {transcript.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}
```

### @elevenlabs/react-native

React Native SDK for building cross-platform agents

#### Installation

```bash
npm install @elevenlabs/react-native

# Install peer dependencies
npm install @livekit/react-native @livekit/react-native-webrtc livekit-client
```

#### Platform Setup

##### iOS

Add the following to your `Info.plist`:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to your microphone for voice conversations.</string>
```

##### Android

Add the following permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

#### Advanced Usage

```tsx
import { useConversation } from "@elevenlabs/react-native";
import {
  View,
  Button,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";

function ConversationScreen() {
  const [messages, setMessages] = useState<
    Array<{ role: string; text: string }>
  >([]);

  const conversation = useConversation({
    onConnect: ({ conversationId }) => {
      setMessages(prev => [
        ...prev,
        {
          role: "system",
          text: "Connected to assistant: " + conversationId,
        },
      ]);
    },
    onMessage: ({ message, source }) => {
      setMessages(prev => [
        ...prev,
        {
          role: source === "ai" ? "agent" : "user",
          text: message,
        },
      ]);
    },
    onError: (message: string) => {
      console.error("Conversation error:", message);
    },
    // Optional: Handle client tools
    clientTools: {
      getDeviceInfo: async () => {
        // Return device-specific information
        return {
          platform: Platform.OS,
          version: Platform.Version,
        };
      },
    },
  });

  const handleSendText = async (text: string) => {
    if (conversation.status === "connected") {
      await conversation.sendUserMessage(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
        <Text>Status: {conversation.status}</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {messages.map((msg, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{msg.role}:</Text>
            <Text>{msg.text}</Text>
          </View>
        ))}
        {conversation.status === "connected" && <ActivityIndicator />}
      </ScrollView>

      <View style={{ padding: 20 }}>
        <Button
          title={
            conversation.status === "connected" ? "End Conversation" : "Start Conversation"
          }
          onPress={conversation.status === "connected" ? conversation.endSession : () => conversation.startSession({ agentId: "your-agent-id" })}
          disabled={conversation.status === "connecting" || conversation.status === "disconnecting"}
        />
      </View>
    </View>
  );
}
```

### Widgets

The ElevenLabs Conversational AI Widgets provide an easy way to embed conversational AI into any website as a web component.

#### Installation

```bash
# For the core widget library (if you want to bundle it yourself)
npm install @elevenlabs/convai-widget-core

# For the pre-bundled widget (recommended for easy embedding)
npm install @elevenlabs/convai-widget-embed
```

#### Basic Usage

##### Using the Pre-bundled Widget

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module">
      import "@elevenlabs/convai-widget-embed";
    </script>
  </head>
  <body>
    <elevenlabs-convai agent-id="your-agent-id"></elevenlabs-convai>
  </body>
</html>
```

##### Using the Core Widget Library

```javascript
import { registerWidget } from "@elevenlabs/convai-widget-core";

// Register the widget custom element
registerWidget();

// Create and add the widget to your page
const widget = document.createElement("elevenlabs-convai");
widget.setAttribute("agent-id", "your-agent-id");
document.body.appendChild(widget);
```

#### Widget Attributes

The widget supports various attributes for customization:

```html
<elevenlabs-convai
  agent-id="your-agent-id"
  width="400"
  height="600"
  theme="light"
></elevenlabs-convai>
```

### Agents CLI

The ElevenLabs Agents CLI allows you to manage your agents as code, with features like version control, templates, and multi-environment deployments.

#### Installation

```bash
# Global installation
npm install -g @elevenlabs/convai-cli
# or
pnpm install -g @elevenlabs/convai-cli

# One-time usage
npx @elevenlabs/convai-cli init
# or
pnpm dlx @elevenlabs/convai-cli init
```

#### Features

- **Agent Configuration**: Full ElevenLabs agent schema support
- **Templates**: Pre-built templates for common use cases
- **Multi-environment**: Deploy across dev, staging, production
- **Smart Updates**: Hash-based change detection
- **Watch Mode**: Automatic sync on file changes
- **Import/Export**: Fetch existing agents from workspace
- **Widget Generation**: HTML widget snippets
- **Secure Storage**: OS keychain integration

#### Quick Start

```bash
# 1. Initialize project
convai init

# 2. Login with API key
convai login

# 3. Create agent with template
convai add "Support Bot" --template customer-service

# 4. Edit configuration (agent_configs/prod/support_bot.json)

# 5. Sync to ElevenLabs
convai sync

# 6. Watch for changes (optional)
convai watch
```

#### Common Commands

```bash
# Authentication
convai login                    # Store API key securely
convai whoami                  # Check authentication status
convai logout                  # Remove stored credentials

# Agent Management
convai add <name>              # Create new agent
convai list                    # List all agents
convai import <agent-id>       # Import existing agent
convai sync                    # Deploy changes
convai watch                   # Auto-sync on changes

# Widget Generation
convai widget <agent-id>       # Generate HTML widget code

# Environment Management
convai env                     # Show current environment
convai env set <env>          # Switch environment
```

## Authentication

### Public Agents

For public agents, simply use the agent ID:

```typescript
const config = {
  agentId: "your-public-agent-id",
};
```

### Private Agents

For private agents, you'll need to generate a signed URL from your backend:

```typescript
// Backend (Node.js example)
async function generateSignedUrl(agentId: string): Promise<string> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
    {
      method: "GET",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
    }
  );

  const data = await response.json();
  return data.signed_url;
}

// Frontend
const signedUrl = await fetchSignedUrlFromBackend();
const config = {
  signedUrl: signedUrl,
};
```

## Client Tools

Client tools allow your agent to trigger actions in your application:

```typescript
const clientTools = {
  updateUI: (params: { component: string; data: any }) => {
    // Update your UI based on agent instructions
    console.log("Updating", params.component, "with", params.data);
    return { success: true };
  },

  fetchData: async (endpoint: string) => {
    // Fetch data requested by the agent
    const response = await fetch(endpoint);
    return response.json();
  },

  performAction: (action: string, parameters: any) => {
    // Perform custom actions
    switch (action) {
      case "navigate":
        window.location.href = parameters.url;
        break;
      case "showNotification":
        alert(parameters.message);
        break;
      default:
        console.log("Unknown action:", action);
    }
    return { status: "completed" };
  },
};
```

## Advanced Configuration

### Audio Settings

```typescript
const audioConfig = {
  inputDevice: "default", // or specific device ID
  outputDevice: "default", // or specific device ID
  sampleRate: 16000, // 16kHz, 22kHz, or 44.1kHz
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
};
```

### Conversation Modes

```typescript
// The SDK automatically handles mode changes between "speaking" and "listening"
// You can monitor the current mode through callbacks:
onModeChange: ({ mode }) => {
  console.log("Current mode:", mode); // "speaking" or "listening"
};
```

## Callbacks

All SDKs support a comprehensive set of callbacks for handling conversation events:

```typescript
import { DisconnectionDetails } from "@elevenlabs/client"; // or @elevenlabs/react or @elevenlabs/react-native

const conversationOptions = {
  agentId: "your-agent-id",

  // Connection lifecycle callbacks
  onConnect: ({ conversationId }) => {
    // Called when successfully connected to the agent
    console.log("Connected with ID:", conversationId);
  },

  onDisconnect: (details: DisconnectionDetails) => {
    // Called when disconnected from the agent
    // details.reason can be: "error", "agent", or "user"
    console.log("Disconnected:", details);
  },

  // Message handling callbacks
  onMessage: ({ message, source }) => {
    // Called for both user and AI messages
    // source is either "user" or "ai"
    console.log(`${source}: ${message}`);
  },

  onAudio: base64Audio => {
    // Called when audio data is received (base64 encoded)
    console.log("Received audio chunk");
  },

  // Error handling
  onError: (message: string) => {
    // Called when an error occurs
    console.error("Error:", message);
  },

  // Status updates
  onModeChange: ({ mode }) => {
    // Mode is either "speaking" or "listening"
    console.log("Mode changed to:", mode);
  },

  onStatusChange: ({ status }) => {
    // Status: "disconnected", "connecting", "connected", or "disconnecting"
    console.log("Status changed to:", status);
  },

  // Advanced callbacks
  onInterruption: ({ event_id }) => {
    // Called when the agent is interrupted
    console.log("Interrupted at:", event_id);
  },

  onVadScore: ({ vadScore }) => {
    // Voice Activity Detection score (0-1)
    console.log("VAD score:", vadScore);
  },

  onCanSendFeedbackChange: ({ canSendFeedback }) => {
    // Indicates if feedback can be sent for the current response
    console.log("Can send feedback:", canSendFeedback);
  },

  // Client tools
  onUnhandledClientToolCall: params => {
    // Called when a client tool is called but not defined
    console.log("Unhandled tool:", params.tool_name);
  },

  // Metadata
  onConversationMetadata: metadata => {
    // Conversation initialization metadata
    console.log("Metadata:", metadata);
  },

  onAgentToolResponse: response => {
    // Agent's tool usage information
    console.log("Agent used tool:", response);
  },

  // Debug (for development)
  onDebug: debugInfo => {
    // Internal debug events
    console.log("Debug:", debugInfo);
  },
};
```

### Error Handling

Handle errors through the `onError` callback and disconnect details:

```typescript
// Error callback
onError: (message: string) => {
  console.error("Error occurred:", message);
};

// Disconnect callback with detailed reasons
onDisconnect: (details: DisconnectionDetails) => {
  switch (details.reason) {
    case "error":
      console.error("Disconnected due to error:", details.message);
      break;
    case "agent":
      console.log("Agent ended the conversation");
      break;
    case "user":
      console.log("User ended the conversation");
      break;
  }
};
```

## Examples

Explore our example applications to see the SDKs in action:

- [Next.JS Example](https://github.com/elevenlabs/elevenlabs-examples/tree/main/examples/conversational-ai/nextjs)
- [React Native Expo Example](https://github.com/elevenlabs/packages/tree/main/examples/react-native-expo)

## API Reference

For detailed API documentation, visit:

- [React SDK API](https://elevenlabs.io/docs/agents-platform/libraries/react)
- [React Native SDK API](https://elevenlabs.io/docs/agents-platform/libraries/react-native)
- [TypeScript/JavaScript Client API](https://elevenlabs.io/docs/agents-platform/libraries/java-script)
- [Agents CLI](https://elevenlabs.io/docs/agents-platform/libraries/agents-cli)

## Troubleshooting

### Common Issues

## Support

- [Documentation](https://elevenlabs.io/docs/agents-platform/overview)
- [Discord Community](https://discord.gg/elevenlabs)
- [Issues](https://github.com/elevenlabs/packages/issues)
- [Support Email](mailto:support@elevenlabs.io)

### Development Setup

This project uses [Turbo](https://turborepo.com) and pnpm to manage dependencies.

```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Start development mode
pnpm run dev
```

### Creating a New Package

```bash
pnpm run create --name=my-new-package
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Engineered by [ElevenLabs](https://elevenlabs.io)
