# Cline Codebase Overview

## Project Structure

The Cline project is a VSCode extension that serves as an AI coding assistant. The project is structured as follows:

- `src/`: Contains the main source code for the extension
  - `api/`: API-related functionality
  - `core/`: Core functionality of the extension
  - `integrations/`: Integration with various VSCode features
  - `services/`: Additional services used by the extension
  - `shared/`: Shared utilities and types
  - `utils/`: Utility functions
- `webview-ui/`: Contains the React-based UI for the extension
- `assets/`: Static assets like icons and documentation
- `cline_docs/`: Project documentation and task management

## Key Components

### API Providers

The `src/api/providers/` directory contains handlers for various AI API providers:

- `anthropic.ts`: Anthropic API handler
- `bedrock.ts`: AWS Bedrock API handler
- `gemini.ts`: Google Gemini API handler
- `generic-aigateway.ts`: Generic AIGateway handler (recently added)
- `ollama.ts`: Ollama API handler
- `openai-native.ts`: OpenAI native API handler
- `openai.ts`: OpenAI API handler
- `openrouter.ts`: OpenRouter API handler
- `vertex.ts`: Google Vertex AI handler

### Core Functionality

The `src/core/` directory contains the main logic for the Cline extension:

- `Cline.ts`: Main class for the Cline extension
- `assistant-message/`: Handling of assistant messages
- `mentions/`: Functionality related to mentions in the chat
- `prompts/`: System prompts and responses
- `sliding-window/`: Implementation of a sliding window for context management
- `webview/`: WebView-related functionality

### Integrations

The `src/integrations/` directory contains various integrations with VSCode features:

- `diagnostics/`: Integration with VSCode diagnostics
- `editor/`: Integration with the VSCode editor
- `misc/`: Miscellaneous integrations
- `terminal/`: Integration with the VSCode terminal
- `theme/`: Theme-related functionality
- `workspace/`: Workspace-related functionality

### Services

The `src/services/` directory contains additional services used by the extension:

- `browser/`: Browser-related services
- `glob/`: File globbing functionality
- `ripgrep/`: Integration with ripgrep for searching
- `tree-sitter/`: Integration with tree-sitter for code parsing

### WebView UI

The `webview-ui/` directory contains a React-based user interface for the extension:

- `src/components/`: React components for various parts of the UI
- `src/context/`: React context providers
- `src/utils/`: Utility functions for the UI

## Recent Changes

The project is currently being updated to support a new type of AI API Provider, specifically an internal AIGateway that supports multiple AI API backends, similar to OpenRouter. This involves:

1. Adding a new "generic AIGateway" option in the API Provider settings.
2. Implementing a mechanism to load a JSON configuration file from a user-specified URL.
3. Allowing users to select from available models defined in the configuration.
4. Implementing custom header management, including support for environment variables.

The `src/api/providers/generic-aigateway.ts` file has been created to handle this new provider type.

## Next Steps

The integration of the generic AIGateway is ongoing. The next steps involve updating various parts of the codebase to fully support this new provider, including changes to the UI, API handling, and configuration management.
