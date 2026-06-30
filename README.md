# Members Only

An exclusive clubhouse where your members can write anonymous posts. Inside the clubhouse, members can see who the author of a post is, but outside they can only see the story and wonder who wrote it.

https://www.theodinproject.com/lessons/node-path-nodejs-members-only

**[Live Demo](https://members-only-production-02a4.up.railway.app)**

---

## Demo Accounts

| Role   | Email                   | Password        |
| ------ | ----------------------- | --------------- |
| User   | demo.user@example.com   | MembersOnly123! |
| Member | demo.member@example.com | MembersOnly123! |
| Admin  | demo.admin@example.com  | MembersOnly123! |

- **User** - Can create messages.
- **Member** - Can also see each message's author and timestamp.
- **Admin** - Can also delete messages.

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Runtime    | Node.js 22                          |
| Framework  | Express 5                           |
| Templating | EJS 6                               |
| Database   | PostgreSQL                          |
| Auth       | Passport.js + bcrypt                |
| Sessions   | express-session + connect-pg-simple |
| Validation | express-validator                   |
| Migrations | node-pg-migrate                     |
| Deployment | Railway                             |

---

## Running Locally

### Prerequisites

- Node.js 22+
- PostgreSQL

### Setup

```bash
# Clone the repo
git clone https://github.com/rlechuong/members-only.git
cd members-only

# Install dependencies
npm install

# Copy the environmental variables and fill in values
cp .env.example .env
```

### Environment Variables (.env)

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
NODE_ENV=development
PORT=3000
# I used: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=
# Used to upgrade to "member" rank
CLUB_PASSCODE=
# Used to upgrade to "admin" rank
ADMIN_PASSCODE=
```

### Database Setup

```bash
# Create the local database
createdb members_only

# Run migrations (creates all tables and seeds reference data)
npm run migrate:up

# Optionally seed demo accounts
node --env-file=.env db/seed.js
```

### Run

```bash
npm run dev
```

---

## Project Structure

```
members-only/
├── app.js                  # Express App Setup
├── config/
│   └── passport.js         # Passport LocalStrategy + Serialize/Deserialize
├── controllers/            # Route Handler Logic (auth, messages, user)
├── db/
│   ├── pool.js             # pg Pool Connection
│   ├── seed.js             # Demo Data Seeding Script
│   └── queries/            # SQL Queries
├── middleware/             # Auth Guards, Validation Chains, Redirect Factories
├── migrations/             # node-pg-migrate Migrations
├── routes/                 # Express Router Definitions (auth, messages, user)
├── views/                  # EJS Templates
│   └── partials/           # Shared Header/Footer
└── public/
    └── css/
        └── styles.css
```

---

## Design Decisions

**Roles as a lookup table with a rank column** - Roles are stored in a separate `roles` table with an ordered `rank` column. This enables clean "at least this rank" checks without hardcoding and gives room to grow.

**`ON DELETE SET NULL` for message authors** - If a user is deleted, their messages still remain with author set to null, displaying "Deleted User".

**Migration schema management** - Tried to use migrations for the first time to gain some experience with it.

---
