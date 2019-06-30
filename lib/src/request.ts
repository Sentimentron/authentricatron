import {VersionRequest} from './versioning'

export type AuthenticatronRequest = VersionRequest;

export interface IRequestEnvelope {
  version: number;
  request: AuthenticatronRequest;
}
