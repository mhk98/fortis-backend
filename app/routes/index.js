const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const CashInRoutes = require('../modules/cashIn/cashIn.routes');




const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRoutes
  },
  
  {
    path: "/cashIn",
    route: CashInRoutes
  },

  
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
