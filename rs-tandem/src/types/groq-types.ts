export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export type Model = {
  active: boolean;
  context_window: number;
  created: number;
  id: string;
  max_completion_tokens: number;
  object: 'model';
  owned_by: string;
  public_apps: null;
};
