import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController";
const router = express.Router();

/**
 * Route for user login. Accepts email and password.
 */
router.post("/login", login);

/**
 * Route for user registration. Accepts user details (email, password).
 */
router.post("/signup", register);

/**
 * Route for user logout. Invalidates the user's session and clears cookie refresh token.
 */
router.get("/logout", logout);

/**
 * Route to refresh the user's JWT token, Provides a new token.
 */
router.get("/refresh-token", refreshToken);

export default router;
