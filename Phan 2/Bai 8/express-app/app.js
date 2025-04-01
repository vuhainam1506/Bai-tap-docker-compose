const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

const dbconfig = {
    host: 'mysql',
    user: 'admin',
    password: 'sapassword',
    database: 'bai8'
}

app.use(express.json());

app.get('/setup', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbconfig);

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL
            )
        `);
        await connection.execute(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            ['Vu Hai Nam', 'vuhainam1506@gmail.com']
            )
        await connection.end()
        res.send('Database setup complete!')
    } catch (error) {
        console.error('Error setting up database:', error)
    }
})

app.get('/users', async(req, res) => {
    try {
        const connection = await mysql.createConnection(dbconfig)
        const [rows] = await connection.execute('SELECT * FROM users')
        await connection.end()

    } catch (error) {
        console.log('Error fetching users:', error)
    }
})

app.get("/", (req, res) => {
    res.send("Hello from Vu Hai Nam's Express app!");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});