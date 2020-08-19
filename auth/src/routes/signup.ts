import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@tmtickets/common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be provided"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // env var defined inside auth-depl.yaml under "env"; the "!" tells TypeScript that we already checked (in index.ts) that the env var was defined
    );

    // Store it on session object
    req.session = {
      // cookie-session library creates req.session - auto stores it inside the cookie sent to the user
      jwt: userJwt,
    };

    res.status(201).send(user); // cookie containing our JWT auto sent to browser
  }
);

export { router as signupRouter };
