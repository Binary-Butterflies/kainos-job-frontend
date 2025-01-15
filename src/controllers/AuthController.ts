import express from "express";
import { createUser, getToken } from "../services/AuthServices";
import { getLogger } from "../LogConfig";
const controllerLogger = getLogger("controller");

export const getLoginForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("GET-ing login form");
  res.render("loginForm.njk", req.query);
};

export const getUnauthorised = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("GET-ing unauthorised page");
  res.render("unauthorised.njk");
};

export const postLoginForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("POST-ing login form");
  try {
    req.session.token = await getToken(req.body);
    res.redirect("/");
  } catch (e) {
    let errorMessage = "Failed to login"

    if (e?.response?.status === 400) {
      if (e.response.data == "User is not valid: Invalid Credentials") {
        errorMessage = "Incorrect Email or Password";
      }
    }

    controllerLogger.error(errorMessage);
    res.locals.errormessage = errorMessage;
    res.render("loginForm.njk", { ...req.query, ...req.body });
  }
};

export const postLogout = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("POST-ing logout");
  req.session.token = null;
  res.redirect("/");
};

export const getRegistrationForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("GET-ing registration form");
  res.render("registrationForm.njk");
};

export const postRegistrationForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  controllerLogger.info("POST-ing registration form");
  try {
    await createUser(req.body);
    res.redirect("/login?newAccount=true");
  } catch (e) {
    let errorMessage = "Failed to register"

    if (e?.response?.status === 400) {
      if (e.response.data.startsWith("User is not valid: Invalid email")) {
        errorMessage = "Please enter a valid Email";
      } else if (e.response.data == "User is not valid: Password cannot be blank") {
        errorMessage = "Please enter a password";
      } else if (e.response.data == "User is not valid: User already exists") {
        errorMessage = "Email already in use";
      }
    }

    controllerLogger.error(errorMessage);
    res.locals.errormessage = errorMessage
    res.render("registrationForm.njk", req.body);
  }
};
