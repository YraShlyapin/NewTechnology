import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'ui_designer'
}).promise()

async function getLastInsertID(){
    const [row] = await pool.query('SELECT LAST_INSERT_ID() AS id')
    return Number(row[0]['id'])
}

export async function getDesigners() {
    const [row] = await pool.query('SELECT * FROM designer')
    return row
}

export async function getOneDesigner(id) {
    const [row] = await pool.query(
        'SELECT * FROM designer WHERE id_designer = ?',
        [id]
    )
    return row[0]
}

export async function addDesigner(obj) {
    await pool.query(
        'INSERT INTO designer (name, image) VALUES (?, ?)',
        [obj.name, obj.image]
    )
    const el = getOneDesigner(await getLastInsertID())
    return el
}

export async function deleteDesigner(id) {
    const el = getOneDesigner(id)
    await pool.query(
        'DELETE FROM designer WHERE id_designer = ?',
        [id]
    )
    return el
}