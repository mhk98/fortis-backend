const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const TblSalesService = require("./tblSales.service");
const { TblSalesFilterAbleFileds } = require("./tblSales.constants");
const ApiError = require("../../../error/ApiError");


const insertIntoDB = catchAsync(async (req, res) => {

  console.log("tblSalesData", req.body)
  
  const result = await TblSalesService.insertIntoDB(req.body);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblSales successfully created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, TblSalesFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


  const result = await TblSalesService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblSales data fetched!!",
      meta: result.meta,
      data: result.data
  })
})

// const getPreviousKot = catchAsync(async (req, res) => {
//   const kotno = await TblSalesService.getPreviousKot();

//   console.log("kotno", kotno)

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Last kotno fetched!",
//     data: kotno
//   });
// });


const getPreviousKot = catchAsync(async (req, res) => {
  const kotno = await TblSalesService.getPreviousKot();

  // sendResponse(res, {
  //   statusCode: 200,
  //   success: true,
  //   message: "Last kotno fetched!",
  //   data: kotno,
  // });

  res.send({
      statusCode: 200,
    success: true,
    message: "Last kotno fetched!",
    data: kotno,
  })
});



const getAllDataById = catchAsync(async (req, res) => {

  const {id} = req.params;
  
  const result = await TblSalesService.getAllDataById(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblSales data fetch!!",
      data: result
  })
})



const updateOneFromDB = catchAsync(async (req, res) => {
  const { data } = req.body; // <- FIXED this line

  console.log("data", data)

  if (!Array.isArray(data) || data.length === 0) {
    throw new ApiError(404, "No items provided");
  }

  const result = await TblSalesService.updateOneFromDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "TblSales updated successfully!",
    data: result,
  });
});

    
    
    const deleteIdFromDB = catchAsync(async (req, res) => {
        const {id} = req.params;
        console.log('deleteId',id)
    
      const result = await TblSalesService.deleteIdFromDB(id);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "TblSales delete successfully!!",
          data: result
      })
    })

 const TblSalesController = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getPreviousKot,
  getAllDataById
}

module.exports = TblSalesController;