require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
   process.env.BASE_DATABASE,
   process.env.BASE_USER,
   process.env.BASE_PASSWORD, 
   {
  host: process.env.BASE_URL,
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('✅ Connected to MySQL successfully...'))
  .catch(err => console.error('❌ Failed to connect to MySQL:', err));

module.exports = sequelize;
