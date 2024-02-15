const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
    config.sequelizeConfig.database,
    config.sequelizeConfig.user,
    config.sequelizeConfig.password,
    {
      dialect: 'mssql',
      host: config.sequelizeConfig.host,
      dialectOptions: {
        options: {
          encrypt: false,
        },
        
      }
    }
  );

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize bağlantısı başarılı');
  } catch (err) {
    console.log("bağlantı hatası", err);
  }
}

connect();
module.exports = sequelize;
