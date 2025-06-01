module.exports = (sequelize, DataTypes) => {
    const tblDiscount = sequelize.define('tblDiscount', {
      date: {
        type: DataTypes.DATE,
        allowNull: true
     },

     tableno: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     kotno: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: true,
        primaryKey: true,
         allowNull: false
     },

     drate: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     damount: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     totalcost: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     gtotal: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     Service: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     tax: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     stotal: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     ttotal: {
        type: DataTypes.FLOAT,
        allowNull: true
     },

     serp: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     taxp: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     waiterno: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     time: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     roomno: {
        type: DataTypes.INTEGER,
        allowNull: true
     },

     userid: {
        type: DataTypes.STRING(50),
        allowNull: true
     },

     KotMain: {
        type: DataTypes.STRING(150),
        allowNull: true
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
  