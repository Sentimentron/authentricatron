import {AuthenticatronRequest} from './request'
import {AuthenticatronResponse} from './response'
import {IVersionResponse, VersionRequest} from './versioning'

export interface ITransporter {
  send(r: AuthenticatronRequest): Promise<AuthenticatronResponse>;
  establishConnection(c: string): Promise<boolean>;

  sendVersionRequest(r: VersionRequest): Promise<IVersionResponse>;
}
