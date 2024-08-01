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

// cadastrar usuario

usuariosRouter.post('/usuarios', async (req, res) => {
  const { nome, cpf, email, telefone, dataNasc, endereco } = req.body

  try {
    const buscarEmail = await Usuario.findOne({ where: { email: email } })
    const buscarCpf = await Usuario.findOne({ where: { cpf: cpf } })

    if (buscarEmail || buscarCpf) {
      return res.status(404).json({ message: 'Email e/ou Cpf já cadastrado!' })
    }

    const novoUsuario = {
      nome,
      cpf,
      email,
      telefone,
      dataNasc,
      endereco
    }

    await Usuario.create(novoUsuario, { include: [Endereco] })
    return res.status(201).json(novoUsuario)
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})

//atualizar usuario

usuariosRouter.put('/usuarios/:idUsuario', async (req, res) => {
  const { nome, cpf, email, telefone, dataNasc, endereco } = req.body
  const { idUsuario } = req.params

  try {
    const usuario = await Usuario.findByPk(idUsuario)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    await Endereco.update(endereco, { where: { usuarioId: idUsuario } })
    await Usuario.update({ nome, cpf, email, telefone, dataNasc })
    return res.status(204).json()
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})

//deletar Usuario

usuariosRouter.delete('/usuarios/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params

  try {
    const usuario = await Usuario.findByPk(idUsuario)
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    await usuario.destroy()
    return res.status(200).json({ message: 'Usuário removido com sucesso!' })
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})
