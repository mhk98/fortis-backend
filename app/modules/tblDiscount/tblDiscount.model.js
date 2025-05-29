module.exports = (sequelize, DataTypes) => {
    const tblDiscount = sequelize.define('tblDiscount', {
      date: {
        type: DataTypes.DATE,
        allowNull: false
     },

     tableno: {
        type: DataTypes.STRING(50),
        allowNull: false
     },

     kotno: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false
     },

     drate: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     damount: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     totalcost: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     gtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     Service: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     tax: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     stotal: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     ttotal: {
        type: DataTypes.FLOAT,
        allowNull: false
     },

     serp: {
        type: DataTypes.STRING(50),
        allowNull: false
     },

     taxp: {
        type: DataTypes.STRING(50),
        allowNull: false
     },

     waiterno: {
        type: DataTypes.STRING(50),
        allowNull: false
     },

     time: {
        type: DataTypes.STRING(50),
        allowNull: false
     },

     roomno: {
        type: DataTypes.INTEGER,
        allowNull: false
     },

     userid: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     KotMain: {
        type: DataTypes.STRING(150),
        allowNull: false
     },

     gName: {
        type: DataTypes.TEXT,
        allowNull: true
     },

     Promotion: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     NewRoom: {
        type: DataTypes.STRING(10),
        allowNull: true
     },

     Company: {
        type: DataTypes.STRING(100),
        allowNull: true
     },

     fldAdvanceId: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: true
     },

     fldAdvPayment: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     fldPrint: {
        type: DataTypes.SMALLINT,
        allowNull: true
     },

     Pax: {
        type: DataTypes.SMALLINT,
        allowNull: true
     },

     SDcrp: {
        type: DataTypes.STRING(5),
        allowNull: true
     },

     SDcharg: {
        type: DataTypes.FLOAT,
        allowNull: true
     }
    }, {
        tableName: 'tblDiscount',
        timestamps: false,      // ✅ Disables createdAt & updatedAt
        freezeTableName: true,  // ✅ Prevents Sequelize from pluralizing table name
        createdAt: false,       // ✅ Redundant if timestamps: false, but explicit
        updatedAt: false,       // ✅ Redundant if timestamps: false, but explicit
        id: false,  
    });
  
    return tblDiscount;
  };
  