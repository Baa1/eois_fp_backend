const http = require('http')
const socketio = require('socket.io')
const app = require('express')
const jwt = require('jsonwebtoken')

const server = http.Server(app)
const io = socketio(server)

const port = 3021
server.listen(process.env.SOCKET_PORT || port, () => {
  console.log(`Socket server started on http://localhost:${port}`)
})

app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

io.use((socket, next) => {
    logger.debug('Socket IO: authorization handshake', socket.handshake)
    if (socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(
        socket.handshake.auth.token,
        process.env.JWT_SECRET,
            (error, decoded) => {
                logger.debug('Socket IO: jwt verification succeeded', { error, decoded })

                if (error) {
                    return next(new Error('Authentication error'))
                }
                socket.decoded_token = decoded
                next()
            }
        )
    } else {
        logger.debug('Socket IO: jwt verification failed: token is empty')
        next(new Error('Authentication error'))
    }
})

io
    .on('connection', socket => socketHandler(socket))
    .on('error', error => {
        logger.error('Ошибка при работе сокета', { info: error })
    })

const clients = []

const socketHandler = socket => {

}

setInterval(() => sendNotifications(), 3000)

const sendNotifications = () => {
    
}
