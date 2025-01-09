import express from "express";
import { getAllJobRoles, } from "../services/JobRoleServices";

export const getIndex = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobrole-home');
};

export const getJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobroles-list', { jobRoles: await getAllJobRoles() });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobroles-list');
    }
};
