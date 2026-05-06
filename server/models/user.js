const bcrypt = require("bcrypt")
const con = require("./db_connect")

async function createUserTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(100) DEFAULT 'active'
      ); `

    await con.query(sql)
    await addColumnIfMissing("password", "VARCHAR(255)")
    await addColumnIfMissing("first_name", "VARCHAR(100)")
    await addColumnIfMissing("last_name", "VARCHAR(100)")
}

createUserTable()

async function addColumnIfMissing(columnName, columnDefinition) {
    try {
        await con.query(`ALTER TABLE user ADD COLUMN ${columnName} ${columnDefinition};`)
    } catch (err) {
        if (err.code !== "ER_DUP_FIELDNAME") {
            throw err
        }
    }
}

async function registerUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    let sql = `
      INSERT INTO user (email, password, first_name, last_name, status)
      VALUES (?, ?, ?, ?, ?);
    `
    const result = await con.query(sql, [
        user.email,
        hashedPassword,
        user.first_name || null,
        user.last_name || null,
        user.status || "active"
    ])
    return {
        user_id: result.insertId,
        email: user.email,
        first_name: user.first_name || null,
        last_name: user.last_name || null,
        status: user.status || "active"
    }
}

async function loginUser(email, password) {
    let sql = `
      SELECT * FROM user
      WHERE email = ?;
    `
    const users = await con.query(sql, [email])
    const user = users[0]

    if (!user) {
        throw new Error("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new Error("Invalid email or password")
    }

    delete user.password
    return user
}

async function updateUser(userId, user) {
    const fields = []
    const values = []

    if (user.email) {
        fields.push("email = ?")
        values.push(user.email)
    }

    if (user.password) {
        fields.push("password = ?")
        values.push(await bcrypt.hash(user.password, 10))
    }

    if (user.first_name !== undefined) {
        fields.push("first_name = ?")
        values.push(user.first_name)
    }

    if (user.last_name !== undefined) {
        fields.push("last_name = ?")
        values.push(user.last_name)
    }

    if (user.status) {
        fields.push("status = ?")
        values.push(user.status)
    }

    if (fields.length === 0) {
        throw new Error("No user fields provided to update")
    }

    values.push(userId)

    let sql = `
      UPDATE user
      SET ${fields.join(", ")}
      WHERE user_id = ?;
    `
    const result = await con.query(sql, values)
    return { message: "User updated", affectedRows: result.affectedRows }
}

async function deleteUser(userId) {
    let sql = `
      DELETE FROM user
      WHERE user_id = ?;
    `
    const result = await con.query(sql, [userId])
    return { message: "User deleted", affectedRows: result.affectedRows }
}

module.exports = { registerUser, loginUser, updateUser, deleteUser }
