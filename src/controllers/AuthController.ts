import express from "express";
import { createUser, getToken } from "../services/AuthServices";
import { getLogger } from "../LogConfig";
const controllerLogger = getLogger("controller");

export const getLoginForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
   controllerLogger.info("GET-ing login form");
  res.render("loginForm.html");
};

export const postLoginForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("POST-ing login form");
  try {
    req.session.token = await getToken(req.body);
    res.redirect("/#");
  } catch (e) {
    controllerLogger.error("Failed to login");
    res.render("loginForm.html", req.body);
  }
};

export const getRegistrationForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("GET-ing registration form");
  res.render("registrationForm.html");
};

export const postRegistrationForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("POST-ing registration form");
  try {
    await createUser(req.body);
    res.redirect("/login");
  } catch (e) {
    controllerLogger.error("Failed to login");
    res.render("registrationForm.html", req.body);
  }
};
