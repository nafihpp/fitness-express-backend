const {
  createAccount,
  getAccountById,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require("../models/accountModel");
const bcrypt = require("bcrypt");
const { sendAccountCreationEmail } = require("./emailService");

/**
 * Registers a new account after hashing the password
 * Sends an email notification upon successful creation
 */
const registerAccount = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const accountData = { ...data, password: hashedPassword };
  const account = await createAccount(accountData);

  // Send an email notification (optional)
  await sendAccountCreationEmail(account.email);
  return account;
};

/**
 * Retrieves an account by ID
 */
const getSingleAccount = async (id) => {
  const account = await getAccountById(id);
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};

/**
 * Fetches a list of accounts with pagination
 */
const getPaginatedAccounts = async (limit = 10, offset = 0) => {
  const accounts = await getAccounts(limit, offset);
  return accounts;
};

/**
 * Updates an existing account
 */
const modifyAccount = async (id, data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const accountData = { ...data, password: hashedPassword };
  const account = await updateAccount(id, accountData);
  if (!account) {
    throw new Error("Account not found or could not be updated");
  }
  return account;
};

/**
 * Deletes an account by ID
 */
const removeAccount = async (id) => {
  await deleteAccount(id);
};

module.exports = {
  registerAccount,
  getSingleAccount,
  getPaginatedAccounts,
  modifyAccount,
  removeAccount,
};
