export interface ISingleError {
  details: string;
  errorCode: number;
}

interface IErrorDescription {
  shortDescription: string;
}

const kClientConnectionError = 40;
const kBadServerResponse = 105;

const errorCodeMap: { [key: number]: IErrorDescription } = {
  40: {
    shortDescription: 'Unable to establish a connection to the server.',
  },
  105: {
    shortDescription: 'The server sent a badly formatted response that could not be understood.',
  },
};


// tslint:disable-next-line: max-classes-per-file
export class ClientError extends Error implements ISingleError {
  public details: string;
  public errorCode: number;
  public internalError: Error | null;
  constructor(errorCode: number, details: string, internalError: Error | null) {
      super();
    this.errorCode = errorCode;
    this.details = details;
    this.internalError = internalError;
  }

  public errorCodeToString(): string {
    if (this.errorCode in errorCodeMap) {
      return errorCodeMap[this.errorCode].shortDescription;
    }
    return `The client generated an error code (${this.errorCode}) that is not understood.`;
  }
}

export type AuthenticatronError = ClientError;

export interface IErrorResponse {
  kind: 'error';
  errors: [ISingleError];
}
