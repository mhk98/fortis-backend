const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const TblBillPending = db.tblBillPending;



const insertIntoDB = async (data) => {

  console.log("data", data)
  const result = await TblBillPending.create(data);

  return result
};



// const getAllFromDB = async () => {
  
//     const result = await TblBillPending.findAll()
  
//     return result
//   };


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let andConditions = [];
  
  // Match `Name` or `Email` starting with the search term
  if (searchTerm) {
    andConditions.push({
      [Op.or]: [
        { repname: { [Op.like]: `${searchTerm}%` } },
        { kitchen: { [Op.like]: `${searchTerm}%` } },
      ]
    });
  }
  

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: { [Op.eq]: value },
      })),
    });
  }

  let whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Try to find TblBillPending matching `title`
  let result = await TblBillPending.findAll({
    where: whereConditions,        // your filter object
    offset: skip || 0,             // e.g., page * limit
    limit: limit || 10,            // number of records per page
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase() ]]
      : [['repid', 'ASC']],       // fallback sort
  });
  

  // If no TblBillPending are found with `title`, fallback to `tag`
  if (result.length === 0 && searchTerm) {
    andConditions = [];
    // andConditions.push({
    //   tag: { [Op.like]: `%${searchTerm}%` }, // Matches anywhere in `tag`
    // });

    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        [Op.and]: Object.entries(filterData).map(([key, value]) => ({
          [key]: { [Op.eq]: value },
        })),
      });
    }

    whereConditions = { [Op.and]: andConditions };

    result = await TblBillPending.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['repid', 'ASC']],
    });
  }

  const total = await TblBillPending.count({ where: whereConditions });

  // If no TblBillPending are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "TblBillPending not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const getAllDataById = async (id) => {
  
    const result = await TblBillPending.findAll({
      where: {
        billNo:id
      }
    })
  
    return result
  };


  const deleteIdFromDB = async (id) => {
  
    const result = await TblBillPending.destroy(
      {
        where:{
          billNo:id
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
  
    const result = await TblBillPending.update(payload, {
      where: {
        billNo: id,
      }
    });
  
    return result;
  };
  


const TblBillPendingService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getAllDataById
};

module.exports = TblBillPendingService;