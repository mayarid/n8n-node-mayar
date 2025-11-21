import type {
  IWebhookFunctions,
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from 'n8n-workflow';
import { buildWorkflowData, MAYAR_EVENT_OUTPUTS } from '../utils/mayarTrigger';
export class MayarTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Mayar Trigger',
    name: 'mayarTrigger',
    icon: 'file:mayar.svg',
    group: ['trigger'],
    version: 1,
    description: 'Handle Mayar events via webhooks',
    defaults: { name: 'Mayar Trigger' },
    inputs: [],
    outputs: ['main', 'main', 'main', 'main', 'main', 'main', 'main', 'main'],
    outputNames: MAYAR_EVENT_OUTPUTS as unknown as string[],
    webhooks: [
      {
        name: 'default',
        httpMethod: 'POST',
        responseMode: 'onReceived',
        path: 'mayar',
      },
    ],
    properties: [
      {
        displayName:
          'Remember to configure Mayar to send events to <b>Webhook URL</b>. <br/>Check <b>Docs</b> link above☝️',
        name: 'operation',
        type: 'notice',
        typeOptions: { theme: 'info' },
        default: '',
      },
      {
        displayName:
          '<b>Events</b>:<br>' +
          '- payment.received — Event triggered after the customer makes a payment / has completed the payment<br>' +
          '- payment.reminder — Event triggered if the customer doesn’t complete the payment after 29 minutes<br>' +
          '- shipper.status — Event triggered if tracking for physical product purchases changed<br>' +
          '- membership.memberUnsubscribed — Event triggered if your membership client unsubscribe<br>' +
          '- membership.memberExpired — Event triggered if your membership client expired<br>' +
          '- membership.changeTierMemberRegistered — Event triggered if your membership client change Tier or Package membership<br>' +
          '- membership.newMemberRegistered — Event triggered if your membership client subscribe / new subscribe member',
        name: 'operation',
        type: 'notice',
        typeOptions: { theme: 'info' },
        default: '',
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
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();
    const payload = req.body;
    const workflowData = buildWorkflowData(this, payload, [], false);
    return { workflowData, webhookResponse: payload };
  }
}