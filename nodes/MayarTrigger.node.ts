import type {
  IWebhookFunctions,
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from 'n8n-workflow';
import { MAYAR_EVENT_OUTPUTS, buildWorkflowData } from '../utils/mayarTrigger';
/**
 * Trigger untuk menerima webhook Mayar dan merutekan payload ke output
 * berdasarkan jenis event.
 */
export class MayarTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Mayar Trigger',
    name: 'mayarTrigger',
    icon: 'fa:bell',
    group: ['trigger'],
    version: 1,
    subtitle: 'Handle Mayar events via webhook',
    description: 'Webhook trigger multi-output per event',
    defaults: { name: 'Mayar Trigger' },
    inputs: [],
    outputs: Array(MAYAR_EVENT_OUTPUTS.length).fill('main'),
    outputNames: [...MAYAR_EVENT_OUTPUTS],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'mayar',
      },
      {
        name: 'setup',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'mayar/setup',
      },
    ],
    properties: [
      {
        displayName: 'Events',
        name: 'events',
        type: 'multiOptions',
        options: MAYAR_EVENT_OUTPUTS.map((event) => ({
          name: event,
          value: event,
        })),
        default: [],
        description: 'Event yang akan di-handle oleh webhook ini',
      },
      {
        displayName: 'Debug',
        name: 'debug',
        type: 'boolean',
        default: false,
        description: 'Tambahkan informasi meta ke response webhook',
      },
    ],
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
    setup: {
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
    const webhookName = this.getWebhookName();
    const req = this.getRequestObject();
    const events = (this.getNodeParameter('events', 0) as string[]) || [];
    const debug = this.getNodeParameter('debug', 0) as boolean;

    let payload: any;
    if (webhookName === 'setup') {
      payload = {
        event: 'payment.received',
        message: 'Webhook Mayar aktif',
      };
    } else {
      payload = req.body;
    }

    const workflowData = buildWorkflowData(this, payload, events);

    return {
      workflowData,
      webhookResponse: debug ? { ok: true, event: payload?.event || payload?.type, meta: { webhookName } } : undefined,
    };
  }
}