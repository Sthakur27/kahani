import { Model, DataTypes, Association } from 'sequelize'
import sequelize  from '../db'
import { StoryNode } from './StoryNode';
class StoryOption extends Model {
    public id!: number
    public text!: string
    public childNodeId!: number
    public parentNodeId!: number
  
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
  
    public getChildNode!: () => Promise<StoryNode>
    public getParentNode!: () => Promise<StoryNode>
    public readonly childNode?: StoryNode
    public readonly parentNode?: StoryNode
  
    public static associations: {
      childNode: Association<StoryOption, StoryNode>,
      parentNode: Association<StoryOption, StoryNode>
    }
  }
  
  StoryOption.init(
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
      childNodeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'StoryNode',
          key: 'id',
        },
      },
      parentNodeId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'StoryNode',
          key: 'id',
        },
      },
    },
    {
      tableName: 'story_options',
      modelName: 'StoryOption',
      sequelize,
    }
  );
  
  StoryOption.belongsTo(StoryNode, { foreignKey: 'parentNodeId', as: 'parentNode' });
  StoryOption.hasOne(StoryNode, { foreignKey: 'childNodeId', as: 'childNode', onDelete: 'CASCADE' });

  export { StoryOption }