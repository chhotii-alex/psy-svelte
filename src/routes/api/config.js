
export let credentials = null;

if (process.env.DATABASE_URL) {
    let connectionString = process.env.DATABASE_URL;
    credentials = { connectionString, };
}
else {
    credentials = {
        "host" : "127.0.0.1",
        "port" : 5432,
        "database" : "sleepcog",
        "connect_timeout": 10,
        "user" : "webapp",
        "password" : process.env.DATABASE_PASSWORD
    };
}

