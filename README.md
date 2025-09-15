![hero](assets/hero.png)

# ElevenLabs Agents SDK

Build powerful conversational applications with [ElevenLabs Conversational AI platform](https://elevenlabs.io/docs/agents-platform/overview). Our SDKs provide seamless integration with popular JavaScript/TypeScript frameworks, enabling you to create multimodal AI-powered conversational agents.

[![npm version](https://img.shields.io/npm/v/@elevenlabs/client)](https://www.npmjs.com/package/@elevenlabs/client)
[![npm version](https://img.shields.io/npm/v/@elevenlabs/react)](https://www.npmjs.com/package/@elevenlabs/react)
[![npm version](https://img.shields.io/npm/v/@elevenlabs/react-native)](https://www.npmjs.com/package/@elevenlabs/react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The ElevenLabs Conversational AI SDKs provide a unified interface for integrating conversational AI capabilities into your applications. Built on WebRTC technology for real-time audio streaming, our SDKs support multiple platforms and frameworks.

### Available Packages

| Package                                               | Description                                               | Version                                                                                                                 |
| ----------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [`@elevenlabs/client`](#elevenlabsclient)             | Core TypeScript/JavaScript client for browser and Node.js | [![npm](https://img.shields.io/npm/v/@elevenlabs/client)](https://www.npmjs.com/package/@elevenlabs/client)             |
| [`@elevenlabs/react`](#elevenlabsreact)               | React hooks and components for web applications           | [![npm](https://img.shields.io/npm/v/@elevenlabs/react)](https://www.npmjs.com/package/@elevenlabs/react)               |
| [`@elevenlabs/react-native`](#elevenlabsreact-native) | React Native SDK for iOS and Android applications         | [![npm](https://img.shields.io/npm/v/@elevenlabs/react-native)](https://www.npmjs.com/package/@elevenlabs/react-native) |

## Quick Start

### Installation

Choose the package that best fits your project:

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
  const { startConversation, endConversation, status } = useConversation({
    agentId: "your-agent-id",
    onConnect: () => console.log("Connected"),
    onMessage: message => console.log("Message:", message),
    onError: error => console.error("Error:", error),
  });

  return (
    <div>
      <button onClick={startConversation}>Start Conversation</button>
      <button onClick={endConversation}>End Conversation</button>
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
conversation.on("connect", () => {
  console.log("Connected to agent");
});

conversation.on("message", message => {
  console.log("Received message:", message);
});

conversation.on("error", error => {
  console.error("Error:", error);
});

// Start the conversation
await conversation.connect();

// Send a message
await conversation.sendMessage("Hello, how can you help me?");

// End the conversation
await conversation.disconnect();
```

#### React Native Example

```tsx
import { useConversation } from "@elevenlabs/react-native";
import { View, Button, Text } from "react-native";

function ConversationScreen() {
  const { startConversation, endConversation, status } = useConversation({
    agentId: "your-agent-id",
    onConnect: () => console.log("Connected"),
    onMessage: message => console.log("Message:", message),
    onError: error => console.error("Error:", error),
  });

  return (
    <View>
      <Button title="Start Conversation" onPress={startConversation} />
      <Button title="End Conversation" onPress={endConversation} />
      <Text>Status: {status}</Text>
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

React hooks and components for building conversational AI interfaces with React/Next.JS

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
    startConversation,
    endConversation,
    status,
    isSpeaking,
    isListening,
    volume,
    setVolume,
  } = useConversation({
    agentId: process.env.REACT_APP_AGENT_ID!,
    onConnect: () => {
      console.log("Connected to AI assistant");
    },
    onMessage: message => {
      setTranscript(prev => [...prev, `Agent: ${message.text}`]);
    },
    onUserTranscript: text => {
      setTranscript(prev => [...prev, `You: ${text}`]);
    },
    onError: error => {
      console.error("Conversation error:", error);
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
        {isListening && <span>🎤 Listening...</span>}
        {isSpeaking && <span>🔊 Speaking...</span>}
      </div>

      <div className="controls">
        <button
          onClick={status === "connected" ? endConversation : startConversation}
          disabled={status === "connecting"}
        >
          {status === "connected" ? "End" : "Start"} Conversation
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
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
} from "react-native";
import { useEffect, useState } from "react";

function ConversationScreen() {
  const [messages, setMessages] = useState<
    Array<{ role: string; text: string }>
  >([]);

  const {
    startConversation,
    endConversation,
    status,
    error,
    isSpeaking,
    isListening,
    sendTextMessage,
  } = useConversation({
    agentId: "your-agent-id",
    onConnect: () => {
      setMessages(prev => [
        ...prev,
        {
          role: "system",
          text: "Connected to assistant",
        },
      ]);
    },
    onMessage: message => {
      setMessages(prev => [
        ...prev,
        {
          role: "agent",
          text: message.text,
        },
      ]);
    },
    onUserTranscript: text => {
      setMessages(prev => [
        ...prev,
        {
          role: "user",
          text: text,
        },
      ]);
    },
    onError: error => {
      console.error("Conversation error:", error);
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
    if (status === "connected") {
      await sendTextMessage(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
        <Text>Status: {status}</Text>
        {error && <Text style={{ color: "red" }}>Error: {error.message}</Text>}
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {messages.map((msg, index) => (
          <View key={index} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{msg.role}:</Text>
            <Text>{msg.text}</Text>
          </View>
        ))}
        {isListening && <ActivityIndicator />}
      </ScrollView>

      <View style={{ padding: 20 }}>
        <Button
          title={
            status === "connected" ? "End Conversation" : "Start Conversation"
          }
          onPress={status === "connected" ? endConversation : startConversation}
          disabled={status === "connecting" || status === "disconnecting"}
        />
      </View>
    </View>
  );
}
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

## Error Handling

All SDKs provide comprehensive error handling:

```typescript
conversation.on("error", error => {
  switch (error.code) {
    case "MICROPHONE_ACCESS_DENIED":
      console.error("Microphone access was denied");
      break;
    case "CONNECTION_FAILED":
      console.error("Failed to connect to the agent");
      break;
    case "NETWORK_ERROR":
      console.error("Network error occurred");
      break;
    default:
      console.error("Unexpected error:", error);
  }
});
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
// Voice mode (default)
conversation.setMode("voice");

// Text-only mode
conversation.setMode("text");

// Listen-only mode
conversation.setMode("listen");
```

## Examples

Explore our example applications to see the SDKs in action:

- [React Example](https://github.com/elevenlabs/conversational-ai-react-demo)
- [Next.js Example](https://github.com/elevenlabs/conversational-ai-nextjs-demo)
- [React Native Example](https://github.com/elevenlabs/conversational-ai-react-native-demo)
- [Vanilla JavaScript Example](https://github.com/elevenlabs/conversational-ai-js-demo)

## API Reference

For detailed API documentation, visit:

- [TypeScript/JavaScript Client API](https://elevenlabs.io/docs/agents-platform/client-sdk)
- [React SDK API](https://elevenlabs.io/docs/agents-platform/react-sdk)
- [React Native SDK API](https://elevenlabs.io/docs/agents-platform/react-native-sdk)

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
