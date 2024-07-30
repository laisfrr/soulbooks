import { connection } from '../config/database.js'
import { DataTypes } from 'sequelize'

export const Emprestimo = connection.define('emprestimo', {
  dataEmprestimo: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dataDevPrevista: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dataDevReal: {
    type: DataTypes.DATE,
    allowNull: true
  }
})
