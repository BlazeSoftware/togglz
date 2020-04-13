interface IWebhookPayloadFeature {
  name: string;
  key: string;
  active: boolean;
}

export default interface IWebhookPayload {
  action: string;
  environment: string;
  feature?: IWebhookPayloadFeature;
}
