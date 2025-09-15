"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'API is running!', dbTime: result.rows[0].now });
    }
    catch (err) {
        res.status(500).json({ error: 'Database connection failed', details: err });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
