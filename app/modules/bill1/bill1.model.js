module.exports = (sequelize, DataTypes) => {
  
      const Bill1 = sequelize.define('Bill1', {
        tableno: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        Roomno: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        Chargeto: {
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        kotno: {
          type: DataTypes.DECIMAL(18, 0),
          primaryKey: true,
          allowNull: false
        },
        waiterno: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        totalprice: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        paymode: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        discount: {
          type: DataTypes.DECIMAL(2, 0),
          allowNull: true,
        },
        paid: {
          type: DataTypes.CHAR(1),
          allowNull: true,
        },
        disamount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        time: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        scode: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        userid: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        KotMain: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        CancelReason: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        fldCash: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        fldCredit: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        fldCard: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        fldVoid: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        fldComp: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        fldString: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        outlet: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        billno: {
          type: DataTypes.DECIMAL(18, 0),
          allowNull: true,
        },
        ResSL: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        PropertyID: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
    }, {
      
        tableName: 'bill1',
        timestamps: false,
        createdAt: false,
        updatedAt: false,


    });
  
    return Bill1;
  };
  