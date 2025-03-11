const pool = require('../config/db');

/**
 * Creates a new account in the database
 */
const createAccount = async (data) => {
  const { first_name, last_name, email, phone, password, birthday } = data;
  const query = `
    INSERT INTO Account (first_name, last_name, email, phone, password, birthday) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *`;
  const values = [first_name, last_name, email, phone, password, birthday];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Fetches an account by its ID from the database
 */
const getAccountById = async (id) => {
  const result = await pool.query('SELECT * FROM Account WHERE id = $1', [id]);
  return result.rows[0];
};

/**
 * Retrieves multiple accounts with pagination support
 */
const getAccounts = async (limit, offset) => {
  const result = await pool.query('SELECT * FROM Account LIMIT $1 OFFSET $2', [limit, offset]);
  return result.rows;
};

/**
 * Updates an existing account with new data
 */
const updateAccount = async (id, data) => {
  const { first_name, last_name, email, phone, password, birthday } = data;
  const query = `
    UPDATE Account 
    SET first_name=$1, last_name=$2, email=$3, phone=$4, password=$5, birthday=$6, last_modified=CURRENT_TIMESTAMP 
    WHERE id=$7 
    RETURNING *`;
  const values = [first_name, last_name, email, phone, password, birthday, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Deletes an account by its ID
 */
const deleteAccount = async (id) => {
  await pool.query('DELETE FROM Account WHERE id = $1', [id]);
};

module.exports = {
  createAccount,
  getAccountById,
  getAccounts,
  updateAccount,
  deleteAccount,
};
