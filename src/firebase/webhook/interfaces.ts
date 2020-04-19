import { IFeature } from "../features/interfaces";

export interface IWebhookPayload {
  action: string;
  environment?: string;
  feature?: IFeature;
}
