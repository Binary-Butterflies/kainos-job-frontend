import express from "express";
import { getAllJobRoles, } from "../services/JobRoleServices";

export const getJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobroles-list.njk', { jobRoles: await getAllJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobroles-list.njk');
    }
};
