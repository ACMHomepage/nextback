import * as mysql2 from 'mysql2';

const initDatabase = ({ host, port, username, password, database }) => {
  const connect = mysql2.createConnection(
    { host, port, user: username, password }
  );
  connect.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
}

export default initDatabase;