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
  pgm.createTable("users", {
    id: {
      type: "bigint",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { precedence: "ALWAYS" },
    },
    first_name: {
      type: "varchar(50)",
      notNull: true,
    },
    last_name: {
      type: "varchar(50)",
      notNull: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    password_hash: {
      type: "varchar(255)",
      notNull: true,
    },
    role_id: {
      type: "bigint",
      notNull: true,
      // No DB-level default. Application code looks up and supplies this on every insert.
      // See db/queries/userQueries.js.
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });

  pgm.addConstraint("users", "fk_users_role_id", {
    foreignKeys: {
      columns: "role_id",
      references: "roles(id)",
      onDelete: "RESTRICT",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint("users", "fk_users_role_id");
  pgm.dropTable("users");
};
