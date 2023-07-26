
import { error } from '@sveltejs/kit';
import { pool } from '../connect.js';

export async function POST( { request } ) {
    const formData = await request.json();
    const access_token = formData['access_token'];
    let sequence = formData['sequence'];
    let query = "SELECT id from Subject where access_token = $1";
    let values = [ access_token ];
    let res = await pool.query(query, values);
    if (res.rows.length < 1) {
        return error(404);
    }
    const subjectId = res.rows[0]['id'];
    query = "INSERT into MST_Session ( subject_id, sequence, start_when) values ($1, $2, $3) returning id";
    values = [subjectId, sequence, new Date()];
    res = await pool.query(query, values);

    let sessionId = res.rows[0]['id'];
    let result = { 'id' : sessionId };
    return new Response(JSON.stringify(result));
}
