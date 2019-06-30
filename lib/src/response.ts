import {IErrorResponse} from './errors'
import {IVersionResponse} from './versioning'

export type AuthenticatronResponse = IErrorResponse | IVersionResponse;

export enum ResponseKind {
    OK,
    Error,
}

export interface IResponseEnvelope {
  version: number;
  status: ResponseKind;
  response: JSON;
}
