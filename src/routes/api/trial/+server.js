
import { error } from '@sveltejs/kit';
import { pool } from '../connect.js';

export async function POST( { request } ) {
    const formData = await request.json();
    const session_id = formData['sessionId'];
    const blockNumber = formData['blockNumber'];
    let query = `INSERT INTO MST_Trial ( session_id, block_number, start_when) 
               values ($1, $2, $3) returning id`;
    let values = [session_id, blockNumber, new Date()];
    let res = await pool.query(query, values);
    let id = res.rows[0]['id'];
    let result = { 'id' : id };
    return new Response(JSON.stringify(result));
}
