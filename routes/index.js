const Router = require('@koa/router')

const route = new Router()

route.get('/', ctx => {
    ctx.body = 'Server for handling contact form data.'
})

module.exports = route