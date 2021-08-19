const Kao = require('koa'),
    cors = require('@koa/cors'),
    body = require('koa-bodyparser')


// Routes
const root = require('./routes/index')
const mail = require('./routes/mail')

const PORT = process.env.PORT || 3000

const app = new Kao()

app.use(cors()).use(body())

app.use(root.routes()).use(mail.routes())

app.listen(PORT, () => console.log(`Server runing at http://localhost:${PORT}`))