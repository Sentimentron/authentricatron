import {AuthenticatronClient} from '../src/client';
import {AuthenticatronRequest} from '../src/request';
import {AuthenticatronResponse} from '../src/response';
import {ClientError} from '../src/errors';
import {ITransporter} from '../src/transporter';
import {IVersionResponse, VersionRequest} from '../src/versioning';

import MockableTransporter from './transporter'

import {expect, assert} from 'chai'
import {describe, it} from 'mocha'

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