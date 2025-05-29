const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const TblRestNameService = require("./tblRestName.service");



const insertIntoDB = catchAsync(async (req, res) => {


  const result = await TblRestNameService.insertIntoDB(req.body);
  console.log("result", result)
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblRestName successfully created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const result = await TblRestNameService.getAllFromDB();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblRestName data fetched!!",
      data: result
  })
})

const getAllDataById = catchAsync(async (req, res) => {

  const {id} = req.params;
  
  const result = await TblRestNameService.getAllDataById(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblRestName data fetch!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
      const result = await TblRestNameService.updateOneFromDB(id, req.body);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "TblRestName update successfully!!",
          data: result
      })
    })
    
    
    const deleteIdFromDB = catchAsync(async (req, res) => {
        const {id} = req.params;
        console.log('deleteId',id)
    
      const result = await TblRestNameService.deleteIdFromDB(id);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "TblRestName delete successfully!!",
          data: result
      })
    })

 const TblRestNameController = {
  getAllFromDB,
  getAllDataById,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB
}

module.exports = TblRestNameController;