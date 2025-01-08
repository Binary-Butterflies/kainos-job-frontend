import express from "express";
import { createUser, getToken } from "../services/AuthServices";

export const getLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('loginForm.html');
}

export const postLoginForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        req.session.token = await getToken(req.body);
        console.log("1")
        res.redirect('/#');
    }catch(e){
        res.locals.errormessage = e.message;
        res.render('loginForm.html', req.body);
    }
}

export const getRegistrationForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('registrationForm.html');
}

export const postRegistrationForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        await createUser(req.body);
        res.redirect('/login');
    }catch(e){
        res.locals.errormessage = e.message;
        res.render('registrationForm.html', req.body);
    }
}

