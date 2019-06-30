import {AuthenticatronClient} from '../src/client';
import {AuthenticatronRequest} from '../src/request';
import {AuthenticatronResponse} from '../src/response';
import {ClientError} from '../src/errors';
import {ITransporter} from '../src/transporter';
import {IVersionResponse, VersionRequest} from '../src/versioning';

import {expect, assert} from 'chai'
import {describe, it} from 'mocha'

class MockableTransporter implements ITransporter {

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


describe('Version check', ()=> {
    it("should say everything's fine when there's a supported version", async ()=> {
        const t = new MockableTransporter({
            kind: "version", maxClientVersion: 1, minClientVersion: 1
        })
        const c = new AuthenticatronClient("", t)
        try {
            const v = await c.checkVersionCompatible()
            expect(v).to.equal(true)
        } catch (err) {
            assert.isNotOk(err, "rejected")
        }
    })
    it("should say everything's fine when there's a greater supported version", (done)=> {
        const t = new MockableTransporter({
            kind: "version", maxClientVersion: 2, minClientVersion: 1
        })
        const c = new AuthenticatronClient("", t)
        c.checkVersionCompatible().then((v)=>{
            expect(v).to.equal(true)
            done()
        }).catch((r)=>{
            assert.isNotOk(r, "promise error")
            done()

        })
    })
    it("should fail when this client is not supported", (done)=> {
        const t = new MockableTransporter({
            kind: "version", maxClientVersion: 2, minClientVersion: 2
        })
        const c = new AuthenticatronClient("", t)
        c.checkVersionCompatible().then((v)=>{
            expect(v).to.equal(false)
            done()
        }).catch((r)=>{
            expect(r).to.equal(null)
            done()
        })
    })
})