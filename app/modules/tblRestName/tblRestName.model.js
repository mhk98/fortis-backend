module.exports = (sequelize, DataTypes) => {
    const tblRestName = sequelize.define('tblRestName', {
     
      ResSL: {
         type: DataTypes.STRING(10),
         primaryKey: true,
      },

      ResName: {
         type: DataTypes.STRING(50),
         allowNull: true
      },

      PropertyID: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      isActive: {
         type: DataTypes.BOOLEAN,
         allowNull: true
      },

      POSType: {
         type: DataTypes.STRING(4),
         allowNull: true,
         defaultValue: 'REST'
      }
      
    }, {
        tableName: 'tblRestName',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblRestName;
  };
  