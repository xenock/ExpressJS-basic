const app = require('express')()

require('./config/passport')()
require('./config/express')(app)

const authRoutes = require("./routes/auth-routes")
const index = require('./routes/index')

app.use('/', authRoutes)
app.use('/', index)

require('./config/error-handler')(app)
module.exports = app
