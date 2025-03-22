export interface ResponseMetadata {
    finish_reason: string;
    model_name: string;
    system_fingerprint: string;
    order_details?: {
      description: string;
    };
  }

  export interface Message {
    type?: "ai" | "human";
    content: string;
    run_id?: string;
    response_metadata?: ResponseMetadata;
  }