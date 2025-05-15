const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
      },
      
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [2, 50], // Minimum 2, Maximum 50 characters
        },
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [2, 50], // Minimum 2, Maximum 50 characters
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false, 
      },

      Phone: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },

      Assigned : {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      CreatedOn : {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      Status : {
        type: DataTypes.STRING,
        allowNull: true, 
      },

      Profile : {
        type: DataTypes.STRING,
        allowNull: true, 
        defaultValue: "active",
      },
    
      Role: {
        type: DataTypes.ENUM("student", "employee", "admin", "superAdmin"),
        allowNull: true,
        defaultValue: "student",
      }      
      
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.Password) {
            const salt = await bcrypt.genSalt(10);
            user.Password = bcrypt.hashSync(user.Password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('Password') && user.Password) {
            const salt = await bcrypt.genSalt(10);
            user.Password = bcrypt.hashSync(user.Password, salt);
          }
        },
      },
    }
  );

  User.prototype.validPassword = async function(Password) {
    return await bcrypt.compare(Password, this.Password);
  };

  return User;
};
