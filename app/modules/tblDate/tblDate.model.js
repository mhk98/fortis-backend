module.exports = (sequelize, DataTypes) => {
    const tblDate = sequelize.define('tblDate', {
      SDATE: {
        type: DataTypes.DATE
       },

     PropertyID: {
        type: DataTypes.STRING(10)
       }
    }, {
        tableName: 'tblDate',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblDate;
  };
  