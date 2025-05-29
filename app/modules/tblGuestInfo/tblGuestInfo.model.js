module.exports = (sequelize, DataTypes) => {
    const tblGuestInfo = sequelize.define('tblGuestInfo', {
      fldRoom: {
        type: DataTypes.INTEGER,
        allowNull: false
     },

     fldGuestName: {
        type: DataTypes.TEXT,
        allowNull: false
     },

     fldNoPost: {
        type: DataTypes.SMALLINT,
        allowNull: false
     },

     fldServiceCharge: {
        type: DataTypes.SMALLINT,
        allowNull: false
     },

     fldGovtVAT: {
        type: DataTypes.SMALLINT,
        allowNull: false
     },

     fldCompany: {
        type: DataTypes.STRING(150),
        allowNull: false
     },

     PropertyID: {
        type: DataTypes.STRING(10),
        allowNull: false
     }
    }, {
        tableName: 'tblGuestInfo',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblGuestInfo;
  };
  