import express from "express";
import { getAllJobRoles, getSingleJobRole, createJobRole } from "../services/JobRoleServices";

export const getIndex = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobrole-home');
};

export const getJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('list-jobroles', { jobRoles: await getAllJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('list-jobroles');
    }
};

export const getJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('list-jobrole', { jobrole: await getSingleJobRole(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('list-jobrole');
    }
};

export const getJobRoleForm = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobrole-form');
};

export const postJobRoleForm = async (req: express.Request, res: express.Response): Promise<void> => {
    try {        
        const id: number = await createJobRole(req.body);
        res.redirect('/jobroles/' + id);
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobrole-form', req.body);
    }
};
