/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("messages", {
    id: {
      type: "bigint",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { precedence: "ALWAYS" },
    },
    title: {
      type: "varchar(100)",
      notNull: true,
    },
    body: {
      type: "text",
      notNull: true,
    },
    author_id: {
      type: "bigint",
      notNull: false, // Nullable on purpose. See foreign key ON DELETE: SET NULL below.
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.addConstraint("messages", "fk_messages_author_id", {
    foreignKeys: {
      columns: "author_id",
      references: "users(id)",
      onDelete: "SET NULL",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint("messages", "fk_messages_author_id");
  pgm.dropTable("messages");
};
