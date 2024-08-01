import { Livro } from '../models/livro.js'
import { Emprestimo } from '../models/emprestimo.js'
import { Usuario } from '../models/usuario.js'
import { Router } from 'express'

export const emprestimosRouter = Router()

// listar emprestimos
emprestimosRouter.get('/emprestimos', async (req, res) => {
  const listarEmprestimos = await Emprestimo.findAll({
    include: [Usuario, Livro]
  })
  res.status(200).json(listarEmprestimos)
})

// buscar emprestimo
emprestimosRouter.get('/emprestimos/:idEmprestimo', async (req, res) => {
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

// cadastrar emprestimo
emprestimosRouter.post('/emprestimos', async (req, res) => {
  const { dataEmprestimo, dataDevPrevista, dataDevReal, usuarioId, livroId } =
    req.body

  try {
    const usuario = await Usuario.findByPk(usuarioId)
    const livro = await Livro.findByPk(livroId)

    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado!' })
    }

    if (!usuario) {
      return res
        .status(404)
        .json({ message: 'Usuário não encontrado! Cadastre o usuário.' })
    }

    const novoEmprestimo = {
      dataEmprestimo,
      dataDevPrevista,
      dataDevReal,
      usuarioId,
      livroId
    }

    await Emprestimo.create(novoEmprestimo)
    return res.status(201).json(novoEmprestimo)
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})

//Atualizar Emprestimo

emprestimosRouter.put('/emprestimos/:idEmprestimo', async (req, res) => {
  const { idEmprestimo } = req.params
  const { dataEmprestimo, dataDevPrevista, dataDevReal } = req.body

  try {
    const emprestimo = await Emprestimo.findByPk(idEmprestimo)

    if (!emprestimo) {
      return res.status(404).json({ message: 'Emprestimo não localizado.' })
    }

    await Emprestimo.update({ dataEmprestimo, dataDevPrevista, dataDevReal })
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})

//Deletar Emprestimo

emprestimosRouter.delete('/emprestimos/:idEmprestimo', async (req, res) => {
  const { idEmprestimo } = req.params

  try {
    const emprestimo = await Emprestimo.findByPk(idEmprestimo)

    if (!emprestimo) {
      return res.status(404).json({ message: 'Emprestimo não localizado.' })
    }

    await emprestimo.destroy()
  } catch (error) {
    return res.status(500).json('um erro aconteceu', error)
  }
})
