const Sequelize = require('sequelize');
const {PASSWORD,DB} = require('./config')

const sequelize = new Sequelize(DB, 'postgres', PASSWORD,{
    host:'localhost',
    dialect: 'postgres',
    port:5000,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
})

sequelize.authenticate()
.then(()=>{
    console.log('database is connected')
}).catch((err)=>{
    console.log(err)
});

sequelize.sync();

module.exports = sequelize;