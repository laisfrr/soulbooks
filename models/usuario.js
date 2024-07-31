import { connection } from '../config/database.js'
import { DataTypes } from 'sequelize'
import { Endereco } from './endereco.js'
import { Emprestimo } from './emprestimo.js'

export const Usuario = connection.define('usuario', {
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  dataNasc: {
    type: DataTypes.DATEONLY
  }
})

Usuario.hasOne(Endereco, { onDelete: 'CASCADE' })
Endereco.belongsTo(Usuario)

Usuario.hasMany(Emprestimo, { onDelete: 'CASCADE' })
Emprestimo.belongsTo(Usuario)
