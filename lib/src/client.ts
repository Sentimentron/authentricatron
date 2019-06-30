import {AuthenticatronError, ClientError} from './errors'
import {ITransporter} from './transporter'
import {kClientVersion, VersionRequest} from './versioning'

type PossibleErrorPromise = Promise<AuthenticatronError | null>;

export class AuthenticatronClient {
  // This is the main user-facing class.
  private endpoint: string;
  private transporter: ITransporter;
  private connectionEstablished: boolean;
  constructor(endpoint: string, transporter: ITransporter) {
    this.endpoint = endpoint;
    this.transporter = transporter;
    this.connectionEstablished = false;
  }

  public async checkVersionCompatible(): Promise<boolean> {
    const response = await this.transporter.sendVersionRequest(new VersionRequest());
    return kClientVersion >= response.minClientVersion && kClientVersion <= response.maxClientVersion;
  }

  private async throwErrorOnConnectionException() {
    const connectionResponse = this.establishConnectionIfNeeded();
    if (connectionResponse != null) {
        throw connectionResponse;
    }
  }

  private async establishConnectionIfNeeded(): PossibleErrorPromise {
    if (this.connectionEstablished) {
      return null;
    }
    const possibleError = await this.transporter.establishConnection(this.endpoint);
    if (possibleError) {
      return new ClientError(40, this.endpoint, null);
    }
    return null;
  }
}
