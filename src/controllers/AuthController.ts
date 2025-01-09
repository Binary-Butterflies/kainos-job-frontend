import express from "express";
import { createUser, getToken } from "../services/AuthServices";

export const getLoginForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  console.log("GET-ing login form");
  res.render("loginForm.html");
};

export const postLoginForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  console.log("POST-ing login form");
  try {
    req.session.token = await getToken(req.body);
    res.redirect("/#");
  } catch (e) {
    res.locals.errormessage = "Failed to login";
    res.render("loginForm.html", req.body);
  }
};

export const getRegistrationForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  console.log("GET-ing registration form");
  res.render("registrationForm.html");
};

export const postRegistrationForm = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  console.log("POST-ing registration form");
  try {
    await createUser(req.body);
    res.redirect("/login");
  } catch (e) {
    res.locals.errormessage = "Failed to login";
    res.render("registrationForm.html", req.body);
  }
};
