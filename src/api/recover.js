// @flow
import { post } from 'lib/apiService';

export function sendRecoverEmail(email: string): Promise<{success: true} | {error: string}> {
  return post('auth', 'recover/send_email', { email });
}
