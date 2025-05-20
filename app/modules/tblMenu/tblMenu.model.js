module.exports = (sequelize, DataTypes) => {
    const tblMenu = sequelize.define('tblMenu', {
      repid: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      repname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      itemcost: {
        type: DataTypes.DECIMAL(19, 4), // money maps best to DECIMAL in Sequelize
        allowNull: true,
      },
      kitchen: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      foodtype: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      serType: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      outlet: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      PropertyID: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      PrintTo: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      SC: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
      },
      SD: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
      },
      VAT: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
      },
      SCP: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
      },
      SDP: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
      },
      VATP: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0,
      },
    }, {
        tableName: 'tblMenu',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblMenu;
  };
  