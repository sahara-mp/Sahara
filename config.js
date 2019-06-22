let config = {
    local: {
        mysql: {
            url: process.DB_URL
        },
        apiKeys: {}
    },
    prod: {
        mysql: {
            url: process.env.JAWSDB_URL
        },
        apiKeys: {}
    }
}

module.exports = config[process.env.APP_ENV || 'local'];