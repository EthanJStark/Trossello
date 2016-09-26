import express from 'express'
import apiUsersRouter from './api/users'
import apiCardsRouter from './api/cards'

const server = express()

server.use(express.static(__dirname+'/public'));

server.get('/api/current-user', (request, response) => {
  response.json({
    id: 42,
    email: "me@me.com",
    password: "123"
  })
})

server.use('/api/users', apiUsersRouter)
server.use('/api/cards', apiCardsRouter)

server.get('/*', (request, response) => {
  response.sendFile(__dirname+'/public/index.html');
});


server.listen(3000)
