module.exports = (sequelize, DataTypes) => {
    const KOTBill = sequelize.define('KOTBill', {
      KotNO: {
        type: DataTypes.STRING(11),
        primaryKey: true,
       },

     Tableno: {
        type: DataTypes.STRING(11)
       },

     Roomno: {
        type: DataTypes.STRING(11)
       },

     Waiterno: {
        type: DataTypes.STRING(11)
       },

     ResSL: {
        type: DataTypes.STRING(11)
       },

     Status: {
        type: DataTypes.STRING(1)
       },

     date: {
        type: DataTypes.DATE
       },

     PropertyID: {
        type: DataTypes.STRING(10)
       }
    }, {
        tableName: 'KOTBill',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return KOTBill;
  };
  