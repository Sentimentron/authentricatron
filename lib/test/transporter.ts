import {ITransporter} from '../src/transporter'
import {AuthenticatronRequest} from '../src/request'
import {AuthenticatronResponse} from '../src/response'
import {IVersionResponse, VersionRequest} from '../src/versioning'
import {ClientError} from '../src/errors'

export default class MockableTransporter implements ITransporter {

    private response: AuthenticatronResponse

    constructor(response: AuthenticatronResponse) {
        this.response = response
    }

    public async send(_: AuthenticatronRequest): Promise<AuthenticatronResponse> {
        return this.response
    }

    public async establishConnection(_: string): Promise<boolean> {
        return true
    }

    public async sendVersionRequest(r: VersionRequest): Promise<IVersionResponse> {
        const response = await this.send(r)
        if (response.kind === "version") {
            return response
        }
        const err = new ClientError(105, JSON.stringify(response), null);
        throw err;
    }
}