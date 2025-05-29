module.exports = (sequelize, DataTypes) => {
    const tblBillPending = sequelize.define('tblBillPending', {
      date: {
        type: DataTypes.DATE
       },

     PropertyID: {
        type: DataTypes.STRING(20)
       },

     ResName: {
        type: DataTypes.STRING(50)
       },

       billNo: {
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
      },
      

     tableNo: {
        type: DataTypes.STRING(10)
       },

     flug: {
        type: DataTypes.SMALLINT
       },

     ResSL: {
        type: DataTypes.STRING(10)
       }
    }, {
      
        tableName: 'tblBillPending',
        timestamps: false,
        primaryKey: false,
        createdAt: false,
        updatedAt: false,
        // Very important
        hasPrimaryKeys: false,
    });
  
    return tblBillPending;
  };
  