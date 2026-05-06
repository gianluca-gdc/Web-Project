const con = require("./db_connect")

async function createUserProfileTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS userprofile (
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

async function createUserProfile(profile) {
    let sql = `
      INSERT INTO userprofile (user_id, first_name, last_name, age, gender, bio, major)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const result = await con.query(sql, [
        profile.user_id,
        profile.first_name,
        profile.last_name,
        profile.age,
        profile.gender,
        profile.bio || null,
        profile.major || null
    ])
    return { profile_id: result.insertId, ...profile }
}

async function getUserProfileById(profileId) {
    let sql = `
      SELECT * FROM userprofile
      WHERE profile_id = ?;
    `
    const profiles = await con.query(sql, [profileId])

    if (!profiles[0]) {
        throw new Error("User profile not found")
    }

    return profiles[0]
}

async function getUserProfileByUserId(userId) {
    let sql = `
      SELECT * FROM userprofile
      WHERE user_id = ?
      ORDER BY updated_at DESC
      LIMIT 1;
    `
    const profiles = await con.query(sql, [userId])

    if (!profiles[0]) {
        throw new Error("User profile not found")
    }

    return profiles[0]
}

async function updateUserProfile(profileId, profile) {
    const fields = []
    const values = []

    const allowedFields = ["first_name", "last_name", "age", "gender", "bio", "major"]

    allowedFields.forEach((field) => {
        if (profile[field] !== undefined) {
            fields.push(`${field} = ?`)
            values.push(profile[field])
        }
    })

    if (fields.length === 0) {
        throw new Error("No profile fields provided to update")
    }

    values.push(profileId)

    let sql = `
      UPDATE userprofile
      SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE profile_id = ?;
    `
    const result = await con.query(sql, values)
    return { message: "User profile updated", affectedRows: result.affectedRows }
}

async function deleteUserProfile(profileId) {
    let sql = `
      DELETE FROM userprofile
      WHERE profile_id = ?;
    `
    const result = await con.query(sql, [profileId])
    return { message: "User profile deleted", affectedRows: result.affectedRows }
}

module.exports = { createUserProfile, getUserProfileById, getUserProfileByUserId, updateUserProfile, deleteUserProfile }
