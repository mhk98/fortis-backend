

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require("../db/db");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataTypes } = require("sequelize");

// Define models
db.KOTBill = require("../app/modules/KOTBill/KOTBill.model")(db.sequelize, DataTypes);
db.tblBillPending = require("../app/modules/tblBillPending/tblBillPending.model")(db.sequelize, DataTypes);
db.tblDate = require("../app/modules/tblDate/tblDate.model")(db.sequelize, DataTypes);
db.tblDiscount = require("../app/modules/tblDiscount/tblDiscount.model")(db.sequelize, DataTypes);
db.bill1 = require("../app/modules/bill1/bill1.model")(db.sequelize, DataTypes);
db.tblGuestInfo = require("../app/modules/tblGuestInfo/tblGuestInfo.model")(db.sequelize, DataTypes);
db.tblMenu = require("../app/modules/tblMenu/tblMenu.model")(db.sequelize, DataTypes);
db.tblProperty = require("../app/modules/tblProperty/tblProperty.model")(db.sequelize, DataTypes);
db.tblRestDetails = require("../app/modules/tblRestDetails/tblRestDetails.model")(db.sequelize, DataTypes);
db.tblRestName = require("../app/modules/tblRestName/tblRestName.model")(db.sequelize, DataTypes);
db.tblSales = require("../app/modules/tblSales/tblSales.model")(db.sequelize, DataTypes);
db.tblWaiter = require("../app/modules/tblWaiter/tblWaiter.model")(db.sequelize, DataTypes);
db.user = require("../app/modules/user/user.model")(db.sequelize, DataTypes);

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
