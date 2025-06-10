import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('contatos.db');

db.execSync(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL
  );
`);

export default db;
