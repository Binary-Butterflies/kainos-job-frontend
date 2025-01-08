import * as AuthController from "../../../src/controllers/AuthController";
import { afterEach, describe } from "node:test"
import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from "express";

declare module "express-session" {
    interface SessionData {
        token: string;
    }
}

describe('AuthController', function(){
    afterEach(()=>{
        sinon.restore();
    });

    describe('LoginForm' , function(){
        it("should render login form", async() => {
            const res = { render: sinon.spy() };
            const req = { };

            await AuthController.getLoginForm(req as Request, res as unknown as Response);

            expect(res.render.calledOnce).to.be.true;
        })
    })
}) 