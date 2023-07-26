
import { Pool } from 'pg';
import { credentials } from './config.js';

export const pool = new Pool(credentials);
pool.connect().then( client => {
    console.log("Connected to database!");
    client.release();
}).catch( err => console.error("error connecting", err.stack));

