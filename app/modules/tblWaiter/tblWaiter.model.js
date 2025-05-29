module.exports = (sequelize, DataTypes) => {
    const tblWaiter = sequelize.define('tblWaiter', {
      waiterno: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,

      },

      Name: {
         type: DataTypes.STRING(100),
         allowNull: false
      },

      Address: {
         type: DataTypes.STRING(250),
         allowNull: false
      },

      RES0: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES1: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES2: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES3: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES4: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES5: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES6: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES7: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES8: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      RES9: {
         type: DataTypes.STRING(10),
         allowNull: true
      },

      PropertyID: {
         type: DataTypes.STRING(10),
         allowNull: true
      }
    }, {
        tableName: 'tblWaiter',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblWaiter;
  };
  