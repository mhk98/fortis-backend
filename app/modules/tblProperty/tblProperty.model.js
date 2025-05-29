module.exports = (sequelize, DataTypes) => {
    const tblProperty = sequelize.define('tblProperty', {
      id: {
         type: DataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
      },

      PropertyID: {
         type: DataTypes.STRING(10),
         allowNull: false
      },

      PropertyName: {
         type: DataTypes.STRING(255),
         allowNull: false
      },

      PropertyAddress: {
         type: DataTypes.STRING(255),
         allowNull: false
      },

      isActive: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true
      },

      CreatedDate: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW
      },

      ModifiedDate: {
         type: DataTypes.DATE,
         defaultValue: DataTypes.NOW
      },

      CreatedBy: {
         type: DataTypes.STRING(50),
         allowNull: false
      },

      UpdatedBy: {
         type: DataTypes.STRING(50),
         allowNull: false
      },

      PrintTo: {
         type: DataTypes.STRING(5),
         allowNull: true
      },

      tokenPOS: {
         type: DataTypes.STRING(3),
         allowNull: true,
         defaultValue: 'No'
      }


    }, {
        tableName: 'tblProperty',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
    });
  
    return tblProperty;
  };
  