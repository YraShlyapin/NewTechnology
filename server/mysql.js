import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'newtechnology'
}).promise()

function getDate(date) {
    return new Date(date).toLocaleDateString().split('.').reverse().join('-')
}

async function getLastInsertID() {
    const [row] = await pool.query('SELECT LAST_INSERT_ID() AS id')
    return Number(row[0]['id'])
}

export async function getUsers() {
    const [row] = await pool.query('SELECT * FROM user')
    return row
}

export async function getOneUser(id) {
    const [row] = await pool.query(
        'SELECT * FROM user WHERE id_user = ?',
        [id]
    )
    return row[0]
}

export async function addUser(obj) {
    await pool.query(
        'INSERT INTO user (name, image, birthday) VALUES (?, ?, ?)',
        [obj?.name, obj?.image, getDate(obj?.birthday)]
    )
    const el = getOneUser(await getLastInsertID())
    return el
}

export async function deleteUser(id) {
    const el = getOneUser(id)
    await pool.query(
        'DELETE FROM user WHERE id_user = ?',
        [id]
    )
    return el
}

export async function setAutoIncrement(id) {
    await pool.query(
        'ALTER TABLE user AUTO_INCREMENT = ?',
        [id]
    )
}