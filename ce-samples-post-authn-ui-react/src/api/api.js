import { base, baseWithCustomBaseUrl } from './api-base';

export const api = {
  getSession: (query = null) => base.get({ url: '/session', query }),
  getSessionAndUser: (query = null) => base.get({ url: '/sessionAndOrganizations', query }),
  getOrganizations: (query = null) => base.get({ url: '/users', query }),
  completeAuthentication: (query = null) => base.get({ url: '/complete', query }),
  abortAuthentication: body => base.post({url: '/abort', body}),
};
