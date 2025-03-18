// export interface ToolCall {
//     id: string;
//     name: string;
//     args: Record<string, any>;
//   }
  
  export interface ResponseMetadata {
    finish_reason: string;
    model_name: string;
    system_fingerprint: string;
  }
  
  export interface Message {
    type?: "ai" | "human";
    content: string;
    // tool_calls?: ToolCall[];
    // tool_call_id?: string | null;
    run_id?: string;
    response_metadata?: ResponseMetadata;
    // custom_data?: Record<string, any>;
  }