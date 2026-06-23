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
  pgm.createTable("roles", {
    id: {
      type: "bigint",
      notNull: true,
      primaryKey: true,
      sequenceGenerated: { precedence: "ALWAYS" },
    },
    name: { type: "varchar(20)", notNull: true, unique: true },
    rank: { type: "smallint", notNull: true, unique: true },
  });

  pgm.sql(`
    INSERT INTO roles (name, rank) VALUES
        ('user', 0),
        ('member', 1),
        ('admin', 2);
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`DELETE FROM roles WHERE name IN ('user', 'member', 'admin');`);
  pgm.dropTable("roles");
};
