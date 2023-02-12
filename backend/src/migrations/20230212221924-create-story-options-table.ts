import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('story_options', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      sourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'story_nodes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      targetId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'story_nodes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('story_options')
  },
}
