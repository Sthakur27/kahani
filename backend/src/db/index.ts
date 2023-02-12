import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'mydatabase',
  username: 'myuser',
  password: 'mypassword',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
})

sequelize.sync()
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch((err) => {
    console.error('Unable to create tables:', err);
  });


export default sequelize;
