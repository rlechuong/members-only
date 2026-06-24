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
  pgm.createTable("session", {
    sid: { type: "varchar", notNull: true, primaryKey: true },
    sess: { type: "jsonb", notNull: true },
    expire: { type: "timestamp(6)", notNull: true },
  });

  pgm.createIndex("session", "expire", { name: "session_expire_idx" });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("session");
};
