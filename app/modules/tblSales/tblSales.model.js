module.exports = (sequelize, DataTypes) => {
    const tblSales = sequelize.define('tblSales', {
      itemcode: {
        type: DataTypes.STRING(50),
       },    
      
      kotno: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        get() {
          const rawValue = this.getDataValue('kotno');
          return rawValue !== null ? parseInt(rawValue) : 0;
        }
      },

     itemname: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     quentity:  { 
        type: DataTypes.FLOAT ,
        allowNull:true
       },

     unitprice: { 
        type: DataTypes.FLOAT ,
        allowNull:true
       },
     
     totalprice: { 
        type: DataTypes.FLOAT ,
        allowNull:true
       },
     
     date: { 
        type: DataTypes.DATEONLY ,
        allowNull:true
       },

     tableno: { 
        type: DataTypes.STRING(50) ,
        allowNull:true
       },
     
     roomno: { 
        type: DataTypes.INTEGER ,
        allowNull:true
       },
     
     waiterno: { 
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     time: { 
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     cancel: {
        type: DataTypes.CHAR(1) ,
        allowNull:true
       },

     paid: {
        type: DataTypes.CHAR(1) ,
        allowNull:true
       },

     Closer: {
        type: DataTypes.CHAR(1) ,
        allowNull:true
       },

     staffno: {
        type: DataTypes.INTEGER ,
        allowNull:true
       },

     billprint: {
        type: DataTypes.CHAR(1) ,
        allowNull:true
       },

       kotStatus: {
        type: DataTypes.STRING,
        allowNull:true,
       },

     entrytime: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     itementryuser: {
        type: DataTypes.STRING ,
        allowNull:true
       },

     printuser: {
        type: DataTypes.STRING(50),
        allowNull:true 
       },

     KotMain: {
        type: DataTypes.STRING(50) ,
        allowNull:true,

       },

     person: {
        type: DataTypes.INTEGER ,
        allowNull:true
       },

     foodtype: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     kitchen: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     discount: {
        type: DataTypes.DECIMAL(18, 0) ,
        allowNull:true
       },

     disAmt: {
        type: DataTypes.DECIMAL(18, 2) ,
        allowNull:true
       },

     Flug: {
        type: DataTypes.SMALLINT ,
        allowNull:true
       },

     Course: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     Fire: {
        type: DataTypes.SMALLINT ,
        allowNull:true
       },

     Remarks: {
        type: DataTypes.TEXT ,
        allowNull:true
       },

     outlet: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     paymode: {
        type: DataTypes.STRING(50) ,
        allowNull:true
       },

     billno: {
        type: DataTypes.DECIMAL(18, 0) ,
        allowNull:true,
       },

     ResSL: {
        type: DataTypes.STRING(10) ,
        allowNull:true
       },

     PropertyID: {
        type: DataTypes.STRING(10) ,
        allowNull:true
       }
    
    }, { 
        tableName: 'tblSales',
        timestamps: false,
        primaryKey: false,
        createdAt: false,
        updatedAt: false,
        // Very important
        hasPrimaryKeys: false,
    });
  
    return tblSales;
  };
  