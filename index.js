import { connection, authenticate } from './config/database.js'
import { Usuario } from './models/usuario.js'
import { Endereco } from './models/endereco.js'
import { Livro } from './models/livro.js'
import { Emprestimo } from './models/emprestimo.js'

authenticate(connection).then(() => {
  connection.sync()
})
