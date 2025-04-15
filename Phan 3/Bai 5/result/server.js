const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

app.get('/', (req, res) => {
    pool.query('SELECT vote, COUNT(vote) as count FROM votes GROUP BY vote', (error, results) => {
        if (error) {
            res.json({ error: error.message });
            return;
        }
        res.json(results.rows);
    });
});

app.listen(80, () => {
    console.log('Result service listening on port 80');
});