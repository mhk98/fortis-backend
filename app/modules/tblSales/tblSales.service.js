const { Op } = require("sequelize");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const TblSales = db.tblSales;
const TblRestName = db.tblRestName;
const TblBillPending = db.tblBillPending;



const insertIntoDB = async (data) => {

  const {orderItems, meal,pax, contact,table, room, guest, outlet, waiterno, kotno, ResSL} = data;

  const existingResName = await TblRestName.findOne({
    where: {
      ResSL:ResSL
    }
  })

  if(!existingResName) {
    throw new ApiError(400, "ResName not found")
  }


  // Find latest kotno
  // const lastEntry = await TblSales.findOne({
  //   order: [['kotno', 'DESC']],
  //   attributes: ['kotno']
  // });

  // const newKotno = lastEntry?.kotno ? lastEntry.kotno + 1 : 1;

  const items = orderItems.map((item) => ({
    itemcode: item.repid,
    // kotno: item.kotno || 123,
    itemname: item.repname,
    quentity: item.quantity,
    unitprice: item.price,
    totalprice: (item.price) * (item.quantity) || 0,
    date: new Date().toISOString().split('T')[0],
    tableno: table,
    roomno: room,
    waiterno,
    time: new Date().toLocaleTimeString().substring(0, 50),
    cancel: 'N',
    paid: 'N',
    Closer: 'N',
    staffno: 1,
    billprint: 'N',
    kotStatus: item.PrintTo,
    entrytime: new Date().toISOString().substring(0, 50),
    itementryuser: waiterno, // no limit specified, using safe max
    printuser: waiterno,
    person: pax,
    foodtype: item.foodtype,
    kitchen: item.kitchen,
    discount: 0,
    disAmt: 0,
    Flug: 1,
    Course: '',
    Fire: 0,
    Remarks: 'N/A', // TEXT field; no truncation needed
    outlet: outlet,
    paymode: '',
    kotno,
    ResSL,
    PropertyID: item.PropertyID,
  }));


  const info = orderItems.map((item) => ({
    date: new Date().toISOString().split('T')[0],
    PropertyID: item.PropertyID,
    ResName: existingResName.ResName,
    tableNo: table,
    billNo:kotno,
    flug: 2,
    ResSL, 
    
  }));


  console.log("items", items)
  console.log("info", info)
  await TblBillPending.bulkCreate(info)
  
  const result = await TblSales.bulkCreate(items);


  return result
};



// const getAllFromDB = async () => {
  
//     const result = await TblSales.findAll()
  
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

  // Try to find TblSales matching `title`
  let result = await TblSales.findAll({
    where: whereConditions,        // your filter object
    offset: skip || 0,             // e.g., page * limit
    limit: limit || 10,            // number of records per page
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase() ]]
      : [['repid', 'ASC']],       // fallback sort
  });
  

  // If no TblSales are found with `title`, fallback to `tag`
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

    result = await TblSales.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['repid', 'ASC']],
    });
  }

  const total = await TblSales.count({ where: whereConditions });

  // If no TblSales are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "TblSales not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};

// const getPreviousKot = async () => {
//   const data = await TblSales.findOne({
//     attributes: ['kotno'],
//     order: [['kotno', 'DESC']],
//   });

//   return data ? data.kotno : 0;
// };


const getPreviousKot = async () => {
  const result = await TblSales.findOne({
    order: [['kotno', 'DESC']],
    attributes: ['kotno'], // শুধুমাত্র kotno আনুন
  });

  return result?.kotno || 0; // kotno না থাকলে 0 রিটার্ন
};


const getAllDataById = async (id) => {
  
  const result = await TblSales.findAll({
    where: {
      kotno:id
    }
  })

  return result
};

  const deleteIdFromDB = async (id) => {
  
    const result = await TblSales.destroy(
      {
        where:{
          itemcode:id
        }
      }
    )
  
    return result
  };
  
  
  const updateOneFromDB = async (items) => {
    const transaction = await db.sequelize.transaction();
    try {
      const result = await Promise.all(
        items.map(item => {
          const updateValues = {
            itemcode: item.itemcode === "" ? undefined : item.itemcode,
            itemname: item.repname === "" ? undefined : item.repname,
            quentity: item.quentity === "" ? undefined : item.quentity,
            unitprice: item.price === "" ? undefined : item.price,
            totalprice: item.totalprice === "" ? undefined : item.totalprice,
            date: new Date().toISOString().split('T')[0],
            tableno: item.table === "" ? undefined : item.table,
            roomno: item.room === "" ? undefined : item.room,
            waiterno: item.waiterno === "" ? undefined : item.waiterno,
            time: new Date().toLocaleTimeString().substring(0, 50),
            cancel: 'N',
            paid: 'N',
            Closer: 'N',
            staffno: 1,
            billprint: item.billprint,
            kotStatus: item.PrintTo === "" ? undefined : item.PrintTo,
            entrytime: new Date().toISOString().substring(0, 50),
            itementryuser: item.waiterno === "" ? undefined : item.waiterno,
            printuser: item.waiterno === "" ? undefined : item.waiterno,
            person: item.pax === "" ? undefined : item.pax,
            foodtype: item.foodtype === "" ? undefined : item.foodtype,
            kitchen: item.kitchen === "" ? undefined : item.kitchen,
            discount: 0,
            disAmt: 0,
            Flug: 1,
            Course: '',
            Fire: 0,
            Remarks: 'N/A',
            outlet: item.outlet === "" ? undefined : item.outlet,
            paymode: '',
            kotno: item.kotno === "" ? undefined : item.kotno,
            ResSL: item.ResSL === "" ? undefined : item.ResSL,
            PropertyID: item.PropertyID === "" ? undefined : item.PropertyID,
          };
  
          return TblSales.update(updateValues, {
            where: { itemcode: item.itemcode },
            transaction,
          });
        })
      );
  
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  
  


const TblSalesService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getPreviousKot,
  getAllDataById
};

module.exports = TblSalesService;