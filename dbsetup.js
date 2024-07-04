const { sqlConnection } = require("./dbconnect.js");
const conn = sqlConnection();

const initDatabase = async () => {
  try {

    await conn.connect();

    await conn.query("CREATE DATABASE IF NOT EXISTS wpr2023");

    await conn.query("USE wpr2023");

    await conn.query(`
      CREATE TABLE IF NOT EXISTS user (
        userId INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS email (
        emailId INT PRIMARY KEY AUTO_INCREMENT,
        senderId INT,
        recipientId INT,
        subject VARCHAR(255),
        body TEXT,
        attachment VARCHAR(255) DEFAULT 'none',
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipientId) REFERENCES user(userId),
        FOREIGN KEY (senderId) REFERENCES user(userId)
      )
    `);

    initData();
  } catch (error) {
    throw new Error(error.message);
  }
};

const initData = async () => {
  const body = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`
  try {
    await conn.connect();

    // insert users
    await conn.query(`
      INSERT IGNORE INTO user (username, email, password)
      VALUES ('MynameisA', 'a@a.com', 'aaa')
    `);

    await conn.query(`
      INSERT IGNORE INTO user (username, email, password)
      VALUES ('Tran Van Thinh', 'thinh@gmail.com', 'thinh')
    `);

    await conn.query(`
      INSERT IGNORE INTO user (username, email, password)
      VALUES ('Alexander Smith', 'smithh@gmai.com', 'smith')
    `);

    //insert emails
    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (1, 2, 'A to Thinh',  ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (1, 2, 'A to Thinh',  ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (1, 3, 'A to Smith', ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (1, 3, 'A to Smith', ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (3, 1, 'Smith to A', ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (3, 1, 'Smith to A', ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (3, 2, 'Smith to Thinh', ?)
    `, [body]);

    await conn.query(`
      INSERT INTO email (senderId, recipientId, subject, body)
      VALUES (3, 2, 'Smith to Thinh', ?)
    `, [body]);

    await conn.query(`
    INSERT INTO email (senderId, recipientId, subject, body)
    VALUES (2, 1, 'Thinh to A', ?)
    `, [body]);

    await conn.query(`
    INSERT INTO email (senderId, recipientId, subject, body, attachment)
    VALUES (2, 1, 'Thinh to A', ?, 'https://images.unsplash.com/photo-1700527021863-e7576be3f852?q=80&w=1883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
    `, [body]);

    await conn.query(`
    INSERT INTO email (senderId, recipientId, subject, body)
    VALUES (2, 3, 'Thinh to Smith', ?)
    `, [body]);

    await conn.query(`
    INSERT INTO email (senderId, recipientId, subject, body)
    VALUES (2, 3, 'Thinh to Smith', ?)
    `, [body]);

    await conn.end();
  } catch (error) {
    throw new Error(error.message);
  }
};

initDatabase();