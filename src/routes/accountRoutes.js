const express = require('express');
const {
  createAccount,
  getAccountById,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require('../controllers/accountController');

const router = express.Router();

/**
 * Route for creating a new account
 */
router.post('/accounts', createAccount);

/**
 * Route for fetching a single account by ID
 */
router.get('/accounts/:id', getAccountById);

/**
 * Route for fetching multiple accounts with pagination
 */
router.get('/accounts', getAccounts);

/**
 * Route for updating an existing account by ID
 */
router.put('/accounts/:id', updateAccount);

/**
 * Route for deleting an account by ID
 */
router.delete('/accounts/:id', deleteAccount);

module.exports = router;
