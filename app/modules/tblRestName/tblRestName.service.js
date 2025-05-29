const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const TblRestName = db.tblRestName;



const insertIntoDB = async (data) => {

  console.log("data", data)
  const result = await TblRestName.create(data);

  return result
};



const getAllFromDB = async () => {
  
    const result = await TblRestName.findAll()
  
    return result
  };



const getAllDataById = async (id) => {
  
    const result = await TblRestName.findAll({
      where: {
        user_id:id
      }
    })
  
    return result
  };


  const deleteIdFromDB = async (id) => {
  
    const result = await TblRestName.destroy(
      {
        where:{
          id:id
        }
      }
    )
  
    return result
  };
  
  
  const updateOneFromDB = async (id, payload) => {

  
  // const {amount, paymentReason, refundCondition, status, user_id} = payload;


  // const data = {
  //   amount: amount === "" ? undefined : amount,
  //   paymentReason: paymentReason === "" ? undefined : paymentReason,
  //   refundCondition: refundCondition === "" ? undefined : refundCondition,
  //   status: status === "" ? undefined : status,
  //   user_id: user_id === "" ? undefined : user_id,

  // }
  
    const result = await CashIn.update(payload, {
      where: {
        id: id,
      }
    });
  
    return result;
  };
  


const TblRestNameService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getAllDataById
};

module.exports = TblRestNameService;