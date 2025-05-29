const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const TblMenuRoutes = require('../modules/tblMenu/tblMenu.routes');
const TblSalesRoutes = require('../modules/tblSales/tblSales.routes');
const TblRestNameRoutes = require('../modules/tblRestName/tblRestName.routes');





const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRoutes
  },
  
  {
    path: "/tblMenu",
    route: TblMenuRoutes
  },

  {
    path: "/tblSales",
    route: TblSalesRoutes
  },

  {
    path: "/tblRestName",
    route: TblRestNameRoutes
  },

  
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
