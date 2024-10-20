# Cline Project: Generic AIGateway Integration

## Project Overview

Cline is an AI coding assistant implemented as a VSCode extension. The current task is to modify the project to support a new type of AI API Provider, specifically an internal AIGateway that supports multiple AI API backends, similar to OpenRouter.

## Objective

The main goal is to implement a "generic AIGateway" option in Cline, allowing users to connect to custom AI API providers by specifying a configuration URL. This enhancement will make Cline more flexible and adaptable to various AI backends.

## Key Requirements

1. Add a new "generic AIGateway" option in the API Provider settings.
2. Implement a mechanism to load a JSON configuration file from a user-specified URL.
3. The configuration file should contain information such as:
   - Host, port, and base URI for the AIGateway
   - Required headers for authentication
   - List of available models
4. Allow users to select from the available models defined in the configuration.
5. Implement custom header management, including support for environment variables.
6. Ensure the new provider works seamlessly with existing Cline features.

## Desired Outcome

Upon completion, users should be able to:
1. Select "generic AIGateway" as an API Provider in Cline's settings.
2. Enter a URL for a JSON configuration file.
3. Optionally provide an API key.
4. View and select from available models defined in the configuration.
5. Use Cline with their custom AIGateway provider as they would with any other supported provider.

## Implementation Considerations

- Maintain the existing architecture and coding standards of the Cline project.
- Ensure proper error handling and user feedback for configuration loading and API interactions.
- Implement the changes in a way that doesn't disrupt existing functionality for other API providers.
- Consider security implications, especially when handling API keys and environment variables.

## Future Extensibility

The implementation should be designed with future enhancements in mind, such as:
- Allowing users to add or modify headers directly in the UI.
- Supporting more complex authentication methods.
- Enabling dynamic updates of the configuration without requiring a restart of the extension.

This context provides a comprehensive overview of the project goals and requirements, serving as a guide for any developer or AI assistant working on the Cline project's generic AIGateway integration.

# CRITICAL INSTRUCTIONS

- never replace code in files with place holders, or comments such as `// the rest of the code remains unchanged`
- always replace the entire file content with the provided code snippet
- ensure that the code snippet is correctly placed within the file's context
- verify that the code snippet is accurate and does not contain syntax errors
- if the code snippet is incorrect, provide the correct version
- at the completion of the task, update cline_docs/taskList.md with the changes made and any new tasks that arise and then end the current task and wait for more instructions
- optimise for making as few changes to the core codebase as possible to make integrating these changes easier
- maintain an understanding of the code base, the folders, the files and the general functionality of the code in cline_docs/codebase.md
    - if cline_docs/codebase.md is not present, create it and document the codebase as you understand it - treat this as a single task and stop at the end of this task
    - if cline_docs/codebase.md is present, update it with any new information you have gained from working on the project when the task is complete

# Next Steps

read cline_docs/taskList.md and continue with the next task
