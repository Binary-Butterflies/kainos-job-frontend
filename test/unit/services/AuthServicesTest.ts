import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { LoginRequest } from "../../../src/models/LoginRequest";
import sinon from "sinon";
import { getToken } from "../../../src/services/AuthServices";
import { expect } from 'chai';


const mock = new MockAdapter(axios);
const loginRequest: LoginRequest = {
    email : "Terry@gmail.com",
    password : "Terry"
}
const badLoginRequest: LoginRequest = {
    email : "T@gmail.com",
    password : "Terry"
}

const registerRequest: LoginRequest = {
    email : "Test",
    password : "Terry"
}

describe('AuthService', function () {
    afterEach(() => {
      sinon.restore();
    });
    describe('login', function () {
      
      it("should return token", async () => {

        const data = ["eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzYzNDEyOTAsImV4cCI6MTczNjM3MDA5MCwiZW1haWwiOiJUZXJyeUBnbWFpbC5jb20iLCJzdWIiOiJUZXJyeUBnbWFpbC5jb20iLCJpc3MiOiJLYWlub3MifQ.Dv1_YV2zS_I09SFQ-Ybach1V_6nLxJr3uLkEmF3TaHk"];

        mock.onPost("http://localhost:8080/api/auth/login",loginRequest).reply(200,data)
        const results = await getToken(loginRequest);
        
        expect(results).to.deep.equal(data);
      });
      
      it('should throw exception when 500 returned by axios', async () => {

        mock.onPost("http://localhost:8080/api/auth/login",badLoginRequest).reply(500);
        try{
            await getToken(badLoginRequest);
        }
        catch(e){
            expect(e.message).to.equal("Failed to get employee")
            return
        }

        });
    });
    describe('register', function () {
      
        it("should return token", async () => {
  
          const data = ["eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzYzNDEyOTAsImV4cCI6MTczNjM3MDA5MCwiZW1haWwiOiJUZXJyeUBnbWFpbC5jb20iLCJzdWIiOiJUZXJyeUBnbWFpbC5jb20iLCJpc3MiOiJLYWlub3MifQ.Dv1_YV2zS_I09SFQ-Ybach1V_6nLxJr3uLkEmF3TaHk"];
  
          mock.onPost("http://localhost:8080/api/auth/login",registerRequest).reply(200,data)
          const results = await getToken(loginRequest);
          
          expect(results).to.deep.equal(data);
        });
        
        it('should throw exception when 500 returned by axios', async () => {
  
          mock.onPost("http://localhost:8080/api/auth/login",badLoginRequest).reply(500);
          try{
              await getToken(loginRequest);
          }
          catch(e){
              expect(e.message).to.equal("Failed to create employee")
              return
          }
  
          });
      });
})    