const catchAsync = require("../../../shared/catchAsync");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const { UserFilterAbleFileds } = require("./user.constants");
const UserService = require("./user.service");
// const { UserService } = require("./user.service");



const login = catchAsync(async (req, res) => {
  console.log(req.body);

  const result = await UserService.login(req.body);

  // Configure cookie options for token storage (optional: for API responses)
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production", // Secure cookies in production
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: "strict", // Optional: Add for additional security
  };

  // If you are using `res` for cookies in an Express/Next.js API, uncomment this:
  res.cookie("accessToken", result.accessToken, cookieOptions);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully!!",
      data: result
  })
})

const register = catchAsync(async (req, res) => {
  const { Name, Username, Email, Password, Contact, Property, Status, Role, Address } = req.body;

  const data = {
    Name, Username, Email, Password, Contact, Property, Status, Role, Address,
    image: req.file ? req.file.path : undefined,
  };

  console.log("Registerdata", data);
  console.log("file", req.file);

  const result = await UserService.register(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully!!",
    data: result,
  });
});



const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, UserFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


  const result = await UserService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getUserById = catchAsync(async (req, res) => {

  const result = await UserService.getUserById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User data fetched!!",
      data: result
  })
})


const updateUserFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
console.log("userId", id);
const {Name, Username, Email, Password, Contact, Property, Status, Role, Address  } = req.body;
console.log("userUpdateData", req.body);
const data = {
  Name: Name === "" ? undefined : Name,
  Username: Username === "" ? undefined : Username,
  Email: Email === "" ? undefined : Email,
  Password: Password === "" ? undefined : Password,
  Contact: Contact === "" ? undefined : Contact,
  Role: Role === "" ? undefined : Role,
  Property: Property === "" ? undefined : Property,
  Status: Status === "" ? undefined : Status,
  Address: Address === "" ? undefined : Address,
  image: req.file === undefined ? undefined : req.file.path,
}

// console.log('userData', data);

console.log(id);
  const result = await UserService.updateUserFromDB(id, data);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User update successfully!!",
      data: result
  })
})


const deleteUserFromDB = catchAsync(async (req, res) => {

  const result = await UserService.deleteUserFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User delete successfully!!",
      data: result
  })
})


const updateUserPasswordFromDB = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await UserService.updateUserPasswordFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password change successfully!!",
      data: result
  })
})


const UserController = {
  getAllFromDB,
  login,
  register,
  getUserById,
  updateUserFromDB,
  deleteUserFromDB,
  updateUserPasswordFromDB
};

module.exports = UserController;
