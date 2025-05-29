module.exports = (sequelize, DataTypes) => {
    const tblRestDetails = sequelize.define('tblRestDetails', {
      ResSL: {
         type: DataTypes.STRING(20),
         allowNull: true,
         primaryKey: true,
      },

      ResName: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      Terminal: {
         type: DataTypes.STRING(255),
         allowNull: true
      },

      ServeTime: {
         type: DataTypes.STRING(255),
         allowNull: true
      }
    }, {
        tableName: 'tblRestDetails',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblRestDetails;
  };
  