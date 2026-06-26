import pool from "../pool.js";

const findUserById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      users.id,
      users.first_name,
      users.last_name, 
      users.email,
      users.role_id,
      roles.name AS role_name,
      roles.rank AS role_rank
    FROM users
    LEFT JOIN roles ON users.role_id = roles.id
    WHERE users.id = $1`,
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

const createUser = async (userData) => {
  const { rows } = await pool.query(
    `
    INSERT INTO users (first_name, last_name, email, password_hash, role_id) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, email, role_id
    `,
    [
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password_hash,
      userData.role_id,
    ],
  );
  return rows[0];
};

const getRoleIdByName = async (roleName) => {
  const { rows } = await pool.query("SELECT id FROM roles WHERE name = $1", [roleName]);
  return rows[0].id;
};

export { findUserByEmail, findUserById, createUser, getRoleIdByName };
