import type { IWebhookFunctions, INodeExecutionData } from 'n8n-workflow';

export const MAYAR_EVENT_OUTPUTS = [
  'payment.received',
  'payment.reminder',
  'shipper.status',
  'membership.newMemberRegistered',
  'membership.memberUnsubscribed',
  'membership.memberExpired',
  'membership.changeTierMemberRegistered',
  'unknown',
] as const;

export type MayarEvent = typeof MAYAR_EVENT_OUTPUTS[number];

/**
 * Bangun data workflow multi-output berdasarkan event Mayar.
 */
export function buildWorkflowData(
  ctx: IWebhookFunctions,
  payload: any,
  allowedEvents: string[] = [],
): INodeExecutionData[][] {
  const outputsCount = MAYAR_EVENT_OUTPUTS.length;
  const workflowData: INodeExecutionData[][] = Array.from({ length: outputsCount }, () => []);
  const event = payload?.event || payload?.type || '';
  let idx = MAYAR_EVENT_OUTPUTS.indexOf(event as MayarEvent);
  const isAllowed = allowedEvents.length === 0 || allowedEvents.includes(event);
  if (!isAllowed) idx = MAYAR_EVENT_OUTPUTS.indexOf('unknown');
  if (idx < 0) idx = MAYAR_EVENT_OUTPUTS.indexOf('unknown');
  const safePayload = typeof payload === 'object' && payload != null ? payload : { raw: payload };
  workflowData[idx] = ctx.helpers.returnJsonArray([safePayload]);
  return workflowData;
}