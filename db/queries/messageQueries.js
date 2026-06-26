import pool from "../pool.js";

const getAllMessages = async () => {
  const { rows } = await pool.query(
    `
    SELECT
      messages.id,
      messages.title,
      messages.body,
      messages.created_at,
      users.first_name AS author_first_name,
      users.last_name AS author_last_name
    FROM messages
    LEFT JOIN users ON messages.author_id = users.id
    ORDER BY messages.created_at DESC
    `,
  );
  return rows;
};

const createMessage = async (messageData) => {
  const { rows } = await pool.query(
    `
    INSERT INTO messages (title, body, author_id)
    VALUES ($1, $2, $3)
    RETURNING id, title, body, author_id, created_at
    `,
    [messageData.title, messageData.body, messageData.author_id],
  );
  return rows[0];
};

export { getAllMessages, createMessage };
