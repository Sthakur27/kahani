import sequelize from './index'
import Umzug from 'umzug'
import * as path from 'path'

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  migrations: {
    pattern: /\.js$/,
    path: path.join(__dirname, `../migrations`),
    params: [sequelize.getQueryInterface(), sequelize.constructor],
  },
  logging: (message: string) => {
    console.log(message)
  },
})

export default umzug
