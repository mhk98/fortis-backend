const TblMenuController = require("./tblMenu.controller");
const router = require("express").Router();

router.post("/create",  TblMenuController.insertIntoDB);
router.get("/", TblMenuController.getAllFromDB);
router.get("/:id", TblMenuController.getAllDataById);
router.delete("/:id", TblMenuController.deleteIdFromDB);
router.put("/:id", TblMenuController.updateOneFromDB);

const TblMenuRoutes = router;
module.exports =  TblMenuRoutes ;
