const path = require('path')
const { Sequelize, QueryTypes, Transaction } = require('sequelize')

const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname + '/../config/config.json'))[env]
let dialectOptions
if (env == 'development') {
  dialectOptions = null
} else {
  dialectOptions= {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
 

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: dialectOptions
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
db.Session = require('../models/Session.js')(sequelize, Sequelize)
db.Project = require('../models/Project.js')(sequelize, Sequelize)
db.Notification = require('../models/Notification.js')(sequelize, Sequelize)
db.Firm = require('../models/Firm')(sequelize, Sequelize)

module.exports = db
