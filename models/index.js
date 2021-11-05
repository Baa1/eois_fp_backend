const config = require('../config/config.json')
const { Sequelize, QueryTypes, Transaction } = require('sequelize')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.QueryTypes = QueryTypes
db.Transaction = Transaction

db.transaction = (callback) => {
    return db.sequelize.transaction({
        isolationLevel: db.Transaction.ISOLATION_LEVELS.READ_COMMITTED
    }, callback)
}

db.User = require('../models/User.js')(sequelize, Sequelize)
db.Role = require('../models/Role.js')(sequelize, Sequelize)
db.RefreshToken = require('../models/RefreshToken.js')(sequelize, Sequelize)
db.UserRole = require('../models/UserRole.js')(sequelize, Sequelize)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = db
