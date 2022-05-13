import * as mysql2 from 'mysql2';

const initDatabase = ({ host, port, user, password, database }) => {
  const connect = mysql2.createConnection({ host, port, user, password });
  connect.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
}

export default initDatabase;