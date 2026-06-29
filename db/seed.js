import bcrypt from "bcrypt";
import pool from "./pool.js";
import { createUser, getRoleIdByName } from "./queries/userQueries.js";
import { createMessage } from "./queries/messageQueries.js";

const DEMO_PASSWORD = "MembersOnly123!";

const seed = async () => {
  console.log("Seeding...");

  await pool.query("TRUNCATE TABLE users, messages RESTART IDENTITY CASCADE");
  // await pool.query("DELETE FROM users WHERE email LIKE 'demo.%@example.com'");

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  const userRoleId = await getRoleIdByName("user");
  const memberRoleId = await getRoleIdByName("member");
  const adminRoleId = await getRoleIdByName("admin");

  const demoUser = await createUser({
    first_name: "Demo",
    last_name: "User",
    email: "demo.user@example.com",
    password_hash: passwordHash,
    role_id: userRoleId,
  });

  const demoMember = await createUser({
    first_name: "Demo",
    last_name: "Member",
    email: "demo.member@example.com",
    password_hash: passwordHash,
    role_id: memberRoleId,
  });

  const demoAdmin = await createUser({
    first_name: "Demo",
    last_name: "Admin",
    email: "demo.admin@example.com",
    password_hash: passwordHash,
    role_id: adminRoleId,
  });

  await createMessage({
    title: "User Message",
    body: "These messages are public for anyone to read, even logged out.",
    author_id: demoUser.id,
  });

  await createMessage({
    title: "Member Message",
    body: "If you can see who wrote these messages and when, you are a member or admin.",
    author_id: demoMember.id,
  });

  await createMessage({
    title: "Admin Message",
    body: "If you can see a delete button, you are an admin.",
    author_id: demoAdmin.id,
  });

  console.log(`User:    demo.user@example.com    /  ${DEMO_PASSWORD}`);
  console.log(`Member:  demo.member@example.com  /  ${DEMO_PASSWORD}`);
  console.log(`Admin:   demo.admin@example.com   /  ${DEMO_PASSWORD}`);

  await pool.end();
  console.log("Seeding Complete.");
};

seed().catch((error) => {
  console.error("Seeding failed: ", error);
  process.exit(1);
});
