import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import sequelize  from '../db'

class User extends Model {
  public id!: number
  public email!: string
  public password!: string
  public firstName!: string
  public lastName!: string
  public rating!: number
  public deactivated!: boolean

  // Hash the password before saving to the database
  public setPassword = (password: string): void => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    this.password = hashedPassword
  }

  // Verify the password against the hashed password in the database
  public checkPassword = (password: string): boolean => {
    return bcrypt.compareSync(password, this.password)
  }
}

User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deactivated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  })

export { User }