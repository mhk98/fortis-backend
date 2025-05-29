const TblSalesController = require("./tblSales.controller");
const router = require("express").Router();

router.post("/create",  TblSalesController.insertIntoDB);
router.get("/", TblSalesController.getAllFromDB);
router.get("/kot/:id", TblSalesController.getAllDataById);
router.get("/kot", TblSalesController.getPreviousKot);
router.delete("/:id", TblSalesController.deleteIdFromDB);
router.put("/bulk-update", TblSalesController.updateOneFromDB);

const TblSalesRoutes = router;
module.exports =  TblSalesRoutes ;
