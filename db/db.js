// // connect to database
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const { Sequelize } = require("sequelize");
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "mssql",
//     dialectOptions: {
//       options: {
//         encrypt: false, // <--- disable SSL encryption
//         trustServerCertificate: true, // allow self-signed certs
//       },
//     },
//     logging: false,
//   }
// );


// // Test the connection
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected successfully");
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database:", error.message);
//     process.exit(1); // Exit the process if DB connection fails
//   });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// module.exports = db;



// connect to database
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,               // disable SSL
        trustServerCertificate: true, // allow self-signed certs
        requestTimeout: 60000         // ⏱️ extend timeout to 60 seconds
      }
    },
    pool: {
      max: 10,        // max number of connections
      min: 0,
      acquire: 60000, // ⏱️ wait up to 60s for a connection
      idle: 10000     // connection idle time before being released
    },
    logging: false,
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
