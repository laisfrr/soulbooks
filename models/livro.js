import { connection } from '../config/database.js'
import { DataTypes } from 'sequelize'
import { Emprestimo } from './emprestimo.js'

export const Livro = connection.define('livro', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  publicacao: {
    type: DataTypes.DATE,
    allowNull: false
  }
})

Livro.hasMany(Emprestimo)
Emprestimo.belongsTo(Livro)
