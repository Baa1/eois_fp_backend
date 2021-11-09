const config = require('../config/config.json')
const { Sequelize, QueryTypes, Transaction } = require('sequelize')

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize
db.QueryTypes = QueryTypes
db.Transaction = Transaction

db.transaction = (callback) => {
  return db.sequelize.transaction({
    isolationLevel: db.Transaction.ISOLATION_LEVELS.READ_COMMITTED
  }, callback)
}

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

db.User = require('../models/User.js')(sequelize, Sequelize)
db.Role = require('../models/Role.js')(sequelize, Sequelize)
db.RefreshToken = require('../models/RefreshToken.js')(sequelize, Sequelize)
db.UserRole = require('../models/UserRole.js')(sequelize, Sequelize)

module.exports = db
