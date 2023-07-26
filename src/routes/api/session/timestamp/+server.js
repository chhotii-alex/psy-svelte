
import { error } from '@sveltejs/kit';
import { pool } from '../../connect.js';

export async function POST( { request } ) {
    console.log("Setting timestamp");
    const formData = await request.json();
    console.log(formData);
    const session_id = formData['sessionId'];
    const timestamp = formData['timeStamp'];
    let query = "UPDATE MST_Session set key_timestamp = $1 where id = $2";
    let values = [ timestamp, session_id ];
    try {
        await pool.query(query, values);
    }
    catch (e) {
        console.log(e);
        return error(503);  // wtf TODO report error
    }
    console.log("Set timestamp?");
    let result = { 'id' : session_id };
    return new Response(JSON.stringify(result));
}
