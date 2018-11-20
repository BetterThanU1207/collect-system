var dbconf = {
    user: 'sa',
    password: '12070413',
    server: '192.168.233.182',
    database: 'MyTest',
    port: 5010,
    options: {
    encrypt: false // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

module.exports = dbconf;