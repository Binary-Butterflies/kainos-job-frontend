import express from "express";
import { getAllJobRoles, getSingleJobRole, } from "../services/JobRoleServices";
import { getLogger } from "../LogConfig";

const logService = getLogger("service");

export const getJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoles`);
        res.render('jobroles-list.njk', { jobRoles: await getAllJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errormessage = 'Failed to get Job Roles';

        logService.error(() => res.locals.errormessage);
        res.render('jobroles-list.njk');
    }
};

export const getJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoleById: ${req.params.id}`);
        res.render('jobrole', { role: await getSingleJobRole(req.params.id, req.session.token) });
    } catch (e) {
        if (e?.response?.status === 404) {
            res.locals.errormessage = 'Job Role does not exist';
        } else {
            res.locals.errormessage = 'Failed to get Job Role';
        }

        logService.error(() => res.locals.errormessage);
        res.render('jobrole');
    }
};
