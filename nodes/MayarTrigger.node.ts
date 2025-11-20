import type {
  IWebhookFunctions,
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from 'n8n-workflow';
export class MayarTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Mayar Trigger',
    name: 'mayarTrigger',
    icon: 'file:mayar.svg',
    group: ['trigger'],
    version: 1,
    subtitle: 'Forward webhook payload',
    description: 'Webhook trigger yang meneruskan request payload apa adanya',
    defaults: { name: 'Mayar Trigger' },
    inputs: [],
    outputs: ['main'],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'mayar',
      },
    ],
    properties: [],
  };

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        return true;
      },
      async create(this: IHookFunctions): Promise<boolean> {
        return true;
      },
      async delete(this: IHookFunctions): Promise<boolean> {
        return true;
      },
    },
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    const payload = req.body;
    const data = this.helpers.returnJsonArray([payload]);
    return {
      workflowData: [data],
      webhookResponse: payload,
    };
  }
}