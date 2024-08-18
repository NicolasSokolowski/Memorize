-- SQLBook: Code
/*  */-- Deploy memorize:tables_creation to pg

BEGIN;

-- Creation d' un domaine pour definir une difficulte min et max
CREATE DOMAIN DIFFICULTY_CHECK AS INT NOT NULL DEFAULT 0 
CHECK (
  VALUE >= 0 AND VALUE <= 32
);

-- Creation d'un domaine pour definir le format des emails
CREATE DOMAIN EMAIL_CHECK AS VARCHAR(255) NOT NULL
CHECK (
  VALUE ~* '^[.\w-]+@([.\w-]+\.)+[.\w-]{2,6}$'
);


-- Creation de la table des utilisateurs
CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" EMAIL_CHECK UNIQUE,
  "password" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

-- Creation de la table des deck
CREATE TABLE "deck" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

-- Creation de la table des cartes
CREATE TABLE "card" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "front" TEXT NOT NULL,
    "back" TEXT NOT NULL,
    "difficulty" DIFFICULTY_CHECK,
    "deck_id" INT NOT NULL REFERENCES "deck"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;