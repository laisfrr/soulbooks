import { connection, authenticate } from './config/database.js'
import express from 'express'
import { emprestimosRouter } from './routes/emprestimos.js'
import { usuariosRouter } from './routes/usuarios.js'

const app = express()
app.use(express.json())

authenticate(connection).then(() => {
  connection.sync()
})

app.use(emprestimosRouter)
app.use(usuariosRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})
