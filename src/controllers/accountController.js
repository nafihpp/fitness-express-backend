const {
    registerAccount,
    getSingleAccount,
    getPaginatedAccounts,
    modifyAccount,
    removeAccount,
  } = require('../services/accountService');
  
  /**
   * Handles creating a new account and responds with the created account
   */
  const createAccount = async (req, res, next) => {
    try {
      const account = await registerAccount(req.body);
      res.status(201).json(account);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Handles fetching a single account by its ID
   */
  const getAccountById = async (req, res, next) => {
    try {
      const account = await getSingleAccount(req.params.id);
      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Handles fetching multiple accounts with pagination
   */
  const getAccounts = async (req, res, next) => {
    try {
      const { limit, offset } = req.query;
      const accounts = await getPaginatedAccounts(parseInt(limit), parseInt(offset));
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Handles updating an account by its ID
   */
  const updateAccount = async (req, res, next) => {
    try {
      const account = await modifyAccount(req.params.id, req.body);
      res.status(200).json(account);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Handles deleting an account by its ID
   */
  const deleteAccount = async (req, res, next) => {
    try {
      await removeAccount(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    createAccount,
    getAccountById,
    getAccounts,
    updateAccount,
    deleteAccount,
  };
  