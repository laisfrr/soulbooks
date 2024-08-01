import { Livro } from '../models/livro.js'
import { Emprestimo } from '../models/emprestimo.js'
import { Usuario } from '../models/usuario.js'
import { Router } from 'express'
import { Endereco } from '../models/endereco.js'

export const usuariosRouter = Router()

//listar usuarios
usuariosRouter.get('/usuarios', async (req, res) => {
  const listarUsuarios = await Usuario.findAll()

  return res.status(200).json(listarUsuarios)
})

// Buscar um Usuario

usuariosRouter.get('/usuarios/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params

  try {
    const usuario = await Usuario.findByPk(idUsuario, { include: [Endereco] })

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    return res.status(200).json(usuario)
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})
