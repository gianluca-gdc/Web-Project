const con = require("./db_connect")

async function createUserProfileTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS UserProfile (
        profile_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(user_id),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        gender VARCHAR(100) NOT NULL,
        bio VARCHAR(300),
        major VARCHAR(100),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ); `

    await con.query(sql)
}

createUserProfileTable()

async function getAllUserProfiles() {
    let sql = `
      SELECT * FROM UserProfile;
    `
    await con.query(sql)
}

module.exports = { getAllUserProfiles }