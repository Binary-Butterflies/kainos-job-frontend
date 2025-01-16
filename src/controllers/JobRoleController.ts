import express from "express";
import { getAllJobRoles, getSingleJobRole, } from "../services/JobRoleServices";
import { getLogger } from "../LogConfig";
import { AxiosError } from "axios";

const logService = getLogger("service");

export const getJobRoles = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoles`);
        res.render('jobroles-list.njk', { jobRoles: await getAllJobRoles(req.session.token) });
    } catch (e) {
        res.locals.errorMessage = 'Failed to get Job Roles';

        logService.error(() => res.locals.errorMessage);
        res.render('jobroles-list.njk');
    }
};

export const getJobRole = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoleById: ${req.params.id}`);
        const role = await getSingleJobRole(req.params.id, req.session.token);

        if (role == null) {
            throw new Error('Failed to get Job Role');
        }

        res.locals.role = role;
        res.render('jobrole.njk');
    } catch (e) {
        handleJobRoleError(e, res);
    }
};

export const getJobRoleSuccess = async (req: express.Request, res: express.Response): Promise<void> => {
    logService.info(() => `getJobRoleSuccess`);
    res.render('jobrole-apply-success.njk');
};

export const getJobRoleApply = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoleApply: ${req.params.id}`);
        const role = await getSingleJobRole(req.params.id, req.session.token);

        if (role == null) {
            throw new Error('Failed to get Job Role');
        }

        res.locals.role = role;
        res.render('jobrole-apply.njk', req.query);
    } catch (e) {
        handleJobRoleError(e, res);
    }
};

export const getJobRoleApplicants = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        logService.info(() => `getJobRoleApplicants: ${req.params.id}`);
        const role = await getSingleJobRole(req.params.id, req.session.token);

        if (role == null) {
            throw new Error('Failed to get Job Role');
        }

        res.locals.role = role;
        res.render('jobrole-applicants.njk', req.query);
    } catch (e) {
        handleJobRoleError(e, res);
    }
};

export const postJobRoleApply = async (req: express.Request, res: express.Response): Promise<void> => {
    logService.info(() => `postJobRoleApply: ${req.params.id}`);

    if (req.file == undefined) {
        res.redirect(`/jobrole/${req.params.id}/apply?fileUploadFailed=true`);
        return;
    }

    res.redirect(`/jobrole/success`);
};

const handleJobRoleError = async (e: AxiosError, res: express.Response) => {
    if (e?.response?.status === 404) {
        res.locals.errorMessage = 'Job Role does not exist';
    } else {
        res.locals.errorMessage = 'Failed to get Job Role';
    }

    logService.error(() => res.locals.errorMessage);
    res.render('jobrole-error.njk');
}