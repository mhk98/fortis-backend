const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const TblMenuService = require("./tblMenu.service");
const { TblMenuFilterAbleFileds } = require("./tblMenu.constants");


const insertIntoDB = catchAsync(async (req, res) => {


  const result = await TblMenuService.insertIntoDB(req.body);
  console.log("result", result)
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblMenu successfully created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, TblMenuFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


  const result = await TblMenuService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblMenu data fetched!!",
      meta: result.meta,
      data: result.data
  })
})

const getAllDataById = catchAsync(async (req, res) => {

  const {id} = req.params;
  
  const result = await TblMenuService.getAllDataById(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "TblMenu data fetch!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
      const result = await TblMenuService.updateOneFromDB(id, req.body);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "TblMenu update successfully!!",
          data: result
      })
    })
    
    
    const deleteIdFromDB = catchAsync(async (req, res) => {
        const {id} = req.params;
        console.log('deleteId',id)
    
      const result = await TblMenuService.deleteIdFromDB(id);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "TblMenu delete successfully!!",
          data: result
      })
    })

 const TblMenuController = {
  getAllFromDB,
  getAllDataById,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB
}

module.exports = TblMenuController;