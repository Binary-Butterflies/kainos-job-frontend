import express from "express";
import { jwtDecode } from "jwt-decode";
import { JwtToken } from "../models/JwtToken";
import { UserRole } from "../models/UserRole";
import "core-js/stable/atob";

export const allowRoles = (allowedRoles: UserRole[]) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.session.token) {
            return res.status(401).send("Not logged in");
        }

        const decodedToken: JwtToken = jwtDecode(req.session.token);
        if (!allowedRoles.includes(decodedToken.Role)) {
            return res.status(403).send("User role not authorised for this action");
        }

        next();
    }
}