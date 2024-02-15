module.exports = {
    mssqlConfig: {
      server: 'localhost',
      database: 'blogdb',
      user: 'sa',
      password: '123456',
      options: {
        encrypt: false,
        trustedConnection: false,
      }
    },
    sequelizeConfig: {
      database: 'blogdb',
      user: 'sa',
      password: '123456',
      dialect: 'mssql',
      host: 'localhost',
      
    }
  };