import express from "express";
import { getAllJobRoles, getSingleJobRole, } from "../services/JobRoleServices";
import { getLogger } from "../LogConfig";

const logService = getLogger("service");

export const getIndex = async (req: express.Request, res: express.Response): Promise<void> => {
    res.render('jobrole-home');
};

export const getJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        res.render('jobroles-list', { jobRoles: await getAllJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = e.message;
        res.render('jobroles-list');
    }
};

export const getJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoleById: ${req.params.id}`);
        res.render('jobrole', { role: await getSingleJobRole(req.params.id) });
    } catch (e) {
        res.locals.errormessage = e.message;
        logService.error(() => `Error fetching job role with ID ${req.params.id}: ${e.message}`);
        res.render('jobrole');
    }
};
