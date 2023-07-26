
import { error } from '@sveltejs/kit';
import { pool } from '../connect.js';

export async function POST( { request } ) {
    const formData = await request.json();
    const access_token = formData['access_token'];
    let result = { 'token' : access_token};

    let query = "SELECT * from Subject where access_token = $1";
    let values = [ access_token ];
    const res = await pool.query(query, values);
    result['isValid'] = res.rows.length == 1;
    return new Response(JSON.stringify(result));
}
