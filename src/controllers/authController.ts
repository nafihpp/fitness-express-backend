import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from "../utils/status-code";
import { User } from "../model/user";
import { generateToken, verifyToken } from "../utils/auth";
import { authSchema } from "../validations/auth";
import { TokenType } from "../model/user/types";

/**
 * Register a new user.
 *
 * **Method**: `POST`
 * **Route**: `/register`
 *
 * @param {string} req.body.username - The username for the new user.
 * @param {string} req.body.password - The password for the new user.
 *
 */
const register = async (req: Request, res: Response):Promise<any> => {
  try {
    const { email, password } = req.body;

    const validationResult = authSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        message: "Validation failed",
        errors: validationResult.error.errors,
      });
    }

    /**  Check if the username already exists */
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Username already taken" });
    }

    /**  Hash the password before saving the user */
    const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT);

    /**  Create a new user */
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const access_token  = generateToken(newUser._id.toString(), newUser?.role,TokenType.ACCESS);
    const refresh_token = generateToken(newUser._id.toString(), newUser?.role,TokenType.REFRESH);

    res.cookie(TokenType.REFRESH, refresh_token, {
      httpOnly: true,
      secure: true,
    });

    res.status(HTTP_STATUS_CREATED).json({
      access_token,
    });
  } catch (error) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json(error?.details);
  }
};

/**
 * Log as a user/admin.
 *
 * **Method**: `POST`
 * **Route**: `/login`
 *
 * @param {string} req.body.username - The username of the user trying to log in.
 * @param {string} req.body.password - The password of the user trying to log in.
 *
 */
const login = async (req: Request, res: Response):Promise<any>=> {
  try {
    const { email, password } = req.body;

    const validationResult = authSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_BAD_REQUEST).json({
        message: "Validation failed",
        errors: validationResult.error.errors,
      });
    }

    /** Find user by username */
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(HTTP_STATUS_UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }

    /**  Check if the password matches */
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res
        .status(HTTP_STATUS_UNAUTHORIZED)
        .json({ message: "Invalid credentials" });
    }


    /**  Generate JWT token */
    const access_token  =  generateToken(user._id.toString(), user?.role, TokenType.ACCESS);
    const refresh_token =  generateToken(user._id.toString(), user?.role, TokenType.REFRESH);

    res.cookie(TokenType.REFRESH, refresh_token, {
      httpOnly: true,
      secure: true,
    });

    res.status(HTTP_STATUS_OK).json({
      access_token,
    });
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json(error?.details);
  }
};

/**
 * Refresh access token using refresh token.
 *
 * **Method**: `POST`
 * **Route**: `/refresh_token`
 */
const refreshToken = async (req: Request, res: Response):Promise<any> => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return res
        .status(HTTP_STATUS_BAD_REQUEST)
        .json({ message: "Refresh token is required" });
    }

    const verifiedUser = verifyToken(refresh_token,TokenType.REFRESH);

    const access_token = generateToken('verifiedUser._id', 'verifiedUser?.role',TokenType.ACCESS);
    const refreshtoken = generateToken('verifiedUser._id', 'verifiedUser?.role', TokenType.REFRESH);

    res.cookie(TokenType.REFRESH, refreshtoken, {
      httpOnly: true,
      secure: true,
    });

    res.status(HTTP_STATUS_OK).json({
      access_token,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS_UNAUTHORIZED)
      .json({ message: "Invalid refresh token" });
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie("refresh_token");
  res.status(HTTP_STATUS_OK).json({ message: "Logged out successfully" });
};


export { register, login, refreshToken, logout };
