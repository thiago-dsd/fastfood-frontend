export interface Agent {
    key: string;
    description: string;
  }
  
  export interface AgentInfo {
    agents: Agent[];
    models: string[];
    default_agent: string;
    default_model: string;
  }