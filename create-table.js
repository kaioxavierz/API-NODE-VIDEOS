import { sql } from "./db.js"

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL, -- duração em segundos
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);`.then(() => {
    console.log('tabela criada com sucesso')
})