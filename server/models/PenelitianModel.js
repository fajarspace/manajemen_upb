const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const UserModel = require("./UserModel.js");

const PenelitianModel = db.define(
  "penelitian",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ketua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anggota: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

UserModel.hasMany(PenelitianModel);
PenelitianModel.belongsTo(UserModel, { foreignKey: "userId" });

module.exports = PenelitianModel;
