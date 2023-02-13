import { Model, DataTypes, Association } from 'sequelize'
import sequelize from '../db'
import { StoryOption } from './StoryOption'
import { User } from './User'

class StoryNode extends Model {
  public id!: number
  public text!: string
  public rating!: number
  public userId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getUser!: () => Promise<User>
  public readonly user?: User

  public static associations: {
    user: Association<StoryNode, User>
    options: Association<StoryNode, StoryOption>
  }
}

StoryNode.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },
  {
    tableName: 'story_nodes',
    modelName: 'StoryNode',
    sequelize,
  }
)

StoryNode.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE',
})

StoryNode.hasMany(StoryOption, {
  foreignKey: 'parentNodeId',
  as: 'options',
  onDelete: 'CASCADE',
})

export { StoryNode }
