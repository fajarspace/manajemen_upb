const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const UserModel = require("./UserModel.js");

const PengabdianModel = db.define(
  "pengabdian",
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
    },
    anggota: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

UserModel.hasMany(PengabdianModel);
PengabdianModel.belongsTo(UserModel, { foreignKey: "userId" });

module.exports = PengabdianModel;
