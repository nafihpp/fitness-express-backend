const { body, validationResult } = require('express-validator');

/**
 * Middleware to validate incoming request data for creating/updating an account
 */
const validateAccount = [
  body('first_name').isString().isLength({ max: 100 }).withMessage('First name must be a string and less than 100 characters.'),
  body('last_name').isString().isLength({ max: 100 }).withMessage('Last name must be a string and less than 100 characters.'),
  body('email').isEmail().isLength({ max: 100 }).withMessage('Email must be a valid email and less than 100 characters.'),
  body('phone').isString().isLength({ max: 16 }).withMessage('Phone must be a string and less than 16 characters.'),
  body('password').isString().isLength({ min: 8, max: 50 }).withMessage('Password must be a string between 8 and 50 characters.'),
  body('birthday').isDate().withMessage('Birthday must be in the format yyyy-mm-dd.'),
];

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateAccount, handleValidationErrors };
