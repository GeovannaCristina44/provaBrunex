import mysql from "mysql2/promise";

const conexao = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "prova",
  port: 3306,
  waitForConnections: true
});

export default conexao;