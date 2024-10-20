import { Anthropic } from "@anthropic-ai/sdk"
import axios from "axios"
import OpenAI from "openai"
import { ApiHandler } from "../"
import { ApiHandlerOptions, ModelInfo } from "../../shared/api"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { ApiStream } from "../transform/stream"

interface AIGatewayConfig {
    baseURL: string
    models: { id: string; info: ModelInfo }[]
    headers: { [key: string]: string }
}

export class GenericAIGatewayHandler implements ApiHandler {
    private options: ApiHandlerOptions
    private client: OpenAI
    private config: AIGatewayConfig | null = null

    constructor(options: ApiHandlerOptions) {
        this.options = options
        this.client = new OpenAI({
            baseURL: "https://placeholder.url", // This will be updated after loading the config
            apiKey: "dummy", // We'll use custom headers for authentication
        })
    }

    private async loadConfig(): Promise<void> {
        if (!this.options.aiGatewayConfigUrl) {
            throw new Error("AIGateway configuration URL is not provided")
        }

        try {
            const response = await axios.get(this.options.aiGatewayConfigUrl)
            const config: AIGatewayConfig = response.data

            // Validate the config structure
            if (!config.baseURL || !Array.isArray(config.models) || !config.headers) {
                throw new Error("Invalid AIGateway configuration structure")
            }

            // Add the API key to the headers if provided
            if (this.options.aiGatewayApiKey) {
                config.headers["X-API-Key"] = this.options.aiGatewayApiKey
            }

            this.config = config

            // Update the client with the loaded configuration
            this.client = new OpenAI({
                baseURL: this.config.baseURL,
                apiKey: "dummy", // We're using custom headers for authentication
                defaultHeaders: this.config.headers,
            })
        } catch (error) {
            console.error("Error loading AIGateway configuration:", error)
            throw new Error("Failed to load AIGateway configuration")
        }
    }

    async initialize(): Promise<void> {
        await this.loadConfig()
    }

    async *createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream {
        if (!this.config) {
            throw new Error("AIGateway configuration not loaded. Call initialize() first.")
        }

        const openAiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: systemPrompt },
            ...convertToOpenAiMessages(messages),
        ]

        try {
            const stream = await this.client.chat.completions.create({
                model: this.getModel().id,
                messages: openAiMessages,
                stream: true,
            })

            for await (const chunk of stream) {
                const delta = chunk.choices[0]?.delta
                if (delta?.content) {
                    yield {
                        type: "text",
                        text: delta.content,
                    }
                }
            }

            // Implement usage tracking if supported by the AIGateway
            // This is a placeholder and should be adjusted based on the actual AIGateway implementation
            yield {
                type: "usage",
                inputTokens: 0,
                outputTokens: 0,
                totalCost: 0,
            }
        } catch (error) {
            console.error("AIGateway API Error:", error)
            throw new Error(`AIGateway API Error: ${error.message}`)
        }
    }

    getModel(): { id: string; info: ModelInfo } {
        if (!this.config) {
            throw new Error("AIGateway configuration not loaded. Call initialize() first.")
        }

        // Return the first model in the config, or implement model selection logic
        return this.config.models[0] || { 
            id: "default-model",
            info: {
                maxTokens: 4096,
                contextWindow: 8192,
                supportsImages: false,
                supportsPromptCache: false,
                description: "Default model for AIGateway",
            }
        }
    }
}
