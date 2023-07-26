
import { error } from '@sveltejs/kit';
import { pool } from '../connect.js';

export async function POST( { request } ) {
    const formData = await request.json();
    console.log(formData);
    const trialId = formData['trialId'];
    const receiptId = formData['receiptId'];
    const keys = formData['keys'];
    console.log(trialId);
    const queryText = "insert into MST_Key_Stroke (trial_id, what_char, key_timestamp) values ($1, $2, $3)";
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        for (let i = 0; i < keys.length; ++i) {
            let keystroke = keys[i];
            let values = [trialId, keystroke['key'], keystroke['timeStamp']];
            console.log(values);
            await client.query(queryText, values);
        }
        await client.query("COMMIT");
    }
    catch (e) {
        await client.query("ROLLBACK");
        throw e;
    }
    finally {
        client.release();
    }
    let result = { 'receiptId' : receiptId};
    return new Response(JSON.stringify(result));
}
