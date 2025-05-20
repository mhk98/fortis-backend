const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const TblMenuRoutes = require('../modules/tblMenu/tblMenu.routes');





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

  
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
