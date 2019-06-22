let config = {
    local: {
        mysql: {
            url: process.DB_URL
        },
        apiKeys: {}
    },
    prod: {
        mysql: {},
        apiKeys: {}
    }
}

module.exports = config[process.env.APP_ENV || 'local'];