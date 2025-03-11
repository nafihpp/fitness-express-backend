// migrations/002_initial_setup.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'postgres', // Connect to the default database
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const databaseName = process.env.DB_NAME;

const createDatabase = async () => {
  try {
    await pool.query(`CREATE DATABASE "${databaseName}"`);
    console.log(`Database "${databaseName}" created successfully.`);
  } catch (err) {
    if (err.code === '42P04') {
      console.log(`Database "${databaseName}" already exists.`);
    } else {
      console.error('Error creating database:', err);
    }
  } finally {
    await pool.end();
  }
};

createDatabase().catch(console.error);
