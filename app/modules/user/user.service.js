const { where, Op } = require("sequelize");
const { generateToken } = require("../../../helpers/jwtHelpers");
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const User = db.user;
const Profile = db.profile;
const Document = db.document;
const Academic = db.academic;
const Tests = db.tests;

const bcrypt = require("bcryptjs");
const ApiError = require("../../../error/ApiError");



const login = async (data) => {

  const { Email, Password } = data;
  console.log("login data", data);

  // Validate request data
  if (!Email || !Password) {
    throw new ApiError(400, "Email number is required.")
  }

  // Find user by email
  const user = await User.findOne({ where: { Email } });
  if (!user) {
    throw new ApiError(404, "No user found with this email. Please create an account first.");
  }

  // Validate password
  const isPasswordValid = bcrypt.compareSync(Password, user.Password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect password or email.")
  }

  // Generate JWT access token
  const accessToken = generateToken(user)

  // Set access token in cookie
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production", // Fixed environment check
    httpOnly: true,
  };
  // res.cookie("accessToken", accessToken, cookieOptions);
  
 const result = {
  accessToken, user
 }

  return result
};



const register = async (data) => {

  const {Email } = data;
 
    const isUserExist = await User.findOne({
      where: { Email: Email },
    });

    if (isUserExist) {
      throw new ApiError(409, "User already exist")
    }

    const result = await User.create(data);

    return result
};


// const getAllUserFromDB = async ( options) => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);

//   const whereConditions = {};


//   const result = await User.findAll({
//       where: whereConditions,
//       offset: skip,
//       limit,
//       order: options.sortBy && options.sortOrder
//           ? [[options.sortBy, options.sortOrder]]
//           : [['createdAt', 'DESC']],
//   });

//   const total = await User.count({
//       where: whereConditions,
//   });

//   return {
//       meta: {
//           total,
//           page,
//           limit
//       },
//       data: result
//   };
// };


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let andConditions = [];
  
  // Match `Name` or `Email` starting with the search term
  if (searchTerm) {
    andConditions.push({
      [Op.or]: [
        { Name: { [Op.like]: `${searchTerm}%` } },
        { Email: { [Op.like]: `${searchTerm}%` } },
        { Username: { [Op.like]: `${searchTerm}%` } },
        { Role: { [Op.like]: `${searchTerm}%` } },
      ]
    });
  }
  

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: { [Op.eq]: value },
      })),
    });
  }

  let whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Try to find User matching `title`
  let result = await User.findAll({
    where: whereConditions,
    offset: skip,
    limit,
    order: options.sortBy && options.sortOrder
      ? [[options.sortBy, options.sortOrder.toUpperCase()]]
      : [['createdAt', 'ASC']],
  });

  // If no User are found with `title`, fallback to `tag`
  if (result.length === 0 && searchTerm) {
    andConditions = [];
    // andConditions.push({
    //   tag: { [Op.like]: `%${searchTerm}%` }, // Matches anywhere in `tag`
    // });

    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        [Op.and]: Object.entries(filterData).map(([key, value]) => ({
          [key]: { [Op.eq]: value },
        })),
      });
    }

    whereConditions = { [Op.and]: andConditions };

    result = await User.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['createdAt', 'ASC']],
    });
  }

  const total = await User.count({ where: whereConditions });

  // If no User are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "User not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};

const getUserById = async (id) => {
  
  const result = await User.findOne({
    where:{
      id:id
    }
  })

  return result
};


const deleteUserFromDB = async (id) => {
  const result = await User.destroy(
    {
      where:{
        id:id
      }
    }
  )

  return result
};


const updateUserFromDB = async (id, payload) => {
 
  const result = await User.update(payload,{
    where:{
      id:id
    }
  })

  return result

};

const updateUserPasswordFromDB = async (id, payload) => {

  console.log("id", id)
  const { currentPassword, newPassword, confirmNewPassword } = payload;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    throw new ApiError('All password fields are required.', 400);
  }

  if (newPassword !== confirmNewPassword) {
    throw new ApiError('New passwords do not match.', 400);
  }

  // Fetch the user from the database
  const user = await User.findByPk(id);
  if (!user) {
    throw new ApiError('User not found.', 404);
  }

  // Verify the current password
  const isMatch = await bcrypt.compare(currentPassword, user.Password);
  if (!isMatch) {
    throw new ApiError('Current password is incorrect.', 401);
  }

  // Hash and update the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the password in the database
  const result = await User.update(
    { Password: hashedPassword }, // Hash the new password
    { where: { id } } // Update the password for the given user id
  );

  return result;
};


 const UserService = {
  getAllFromDB,
  login,
  register,
  deleteUserFromDB,
  updateUserFromDB,
  getUserById,
  updateUserPasswordFromDB

}

module.exports = UserService