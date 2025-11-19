import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MayarApi implements ICredentialType {
  name = 'mayarApi';
  displayName = 'Mayar API';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      typeOptions: { password: true },
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.mayar.id/hl/v1',
      description: 'Sandbox: https://api.mayar.club/hl/v1',
    },
  ];

  authenticate = {
    type: 'generic' as const,
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  };
}
