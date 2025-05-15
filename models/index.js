

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

// Define models
db.user = require("../app/modules/user/user.model")(db.sequelize, DataTypes);

db.cashIn = require("../app/modules/cashIn/cashIn.model")(db.sequelize, DataTypes);

// ✅ StudentComment - StudentReply association (WITH correct alias)


// 🔁 User associations
// db.user.hasMany(db.profile, { foreignKey: "user_id" });
// db.profile.belongsTo(db.user, { foreignKey: "user_id" });

// ❌ Removed redundant duplicate `studentComment` - `studentReply` mapping
// (already defined above)

// ✅ Sync the database
db.sequelize
  .sync({ force: false }) // don't use `force: true` in production
  .then(() => {
    console.log("Connection re-synced successfully");
  })
  .catch((err) => {
    console.error("Error on re-sync:", err);
  });

module.exports = db;
