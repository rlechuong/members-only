import pool from "../pool.js";

const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, first_name, last_name, email, role_id FROM users WHERE id = $1",
    [id],
  );
  return rows[0];
};

const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    "SELECT id, first_name, last_name, email, password_hash, role_id FROM users WHERE email = $1",
    [email],
  );
  return rows[0];
};

export { findUserByEmail, findUserById };
