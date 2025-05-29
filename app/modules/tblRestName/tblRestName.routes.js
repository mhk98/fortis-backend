const TblRestNameController = require("./tblRestName.controller");
const router = require("express").Router();

router.post("/create",  TblRestNameController.insertIntoDB);
router.get("/", TblRestNameController.getAllFromDB);
router.get("/:id", TblRestNameController.getAllDataById);
router.delete("/:id", TblRestNameController.deleteIdFromDB);
router.put("/:id", TblRestNameController.updateOneFromDB);

const TblRestNameRoutes = router;
module.exports =  TblRestNameRoutes ;
