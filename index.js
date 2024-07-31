import { connection, authenticate } from './config/database.js'
import express from 'express'
import { Usuario } from './models/usuario.js'
import { Endereco } from './models/endereco.js'
import { Livro } from './models/livro.js'
import { Emprestimo } from './models/emprestimo.js'

const app = express()
app.use(express.json())

authenticate(connection).then(() => {
  connection.sync()
})

app.get('/emprestimos', async (req, res) => {
  const listarEmprestimos = await Emprestimo.findAll({
    include: [Usuario, Livro]
  })
  res.status(200).json(listarEmprestimos)
})

app.get('/emprestimos/:idEmprestimo', async (req, res) => {
  const { idEmprestimo } = req.params

  const emprestimo = await Emprestimo.findOne({
    where: { id: idEmprestimo },
    include: [Usuario, Livro]
  })

  if (!emprestimo) {
    return res.status(404).json({ message: 'Emprestimo não encontrado!' })
  }

  return res.status(200).json(emprestimo)
})

const port = 3000
app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`)
})
