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
    ketuaNidn: {
      type: DataTypes.STRING,
    },
    ketuaJafung: {
      type: DataTypes.STRING,
    },
    anggota1: {
      type: DataTypes.STRING,
    },
    anggota1Nidn: {
      type: DataTypes.STRING,
    },
    anggota1Jafung: {
      type: DataTypes.STRING,
    },
    anggota2: {
      type: DataTypes.STRING,
    },
    anggota2Nidn: {
      type: DataTypes.STRING,
    },
    anggota2Jafung: {
      type: DataTypes.STRING,
    },
    anggota3: {
      type: DataTypes.STRING,
    },
    anggota3Nidn: {
      type: DataTypes.STRING,
    },
    anggota3Jafung: {
      type: DataTypes.STRING,
    },
    anggota4: {
      type: DataTypes.STRING,
    },
    anggota4Nidn: {
      type: DataTypes.STRING,
    },
    anggota4Jafung: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penelitianAkhir: {
      type: DataTypes.STRING, // You can adjust this to the appropriate data type
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING, // You can adjust this to the appropriate data type
    },
    status: {
      type: DataTypes.STRING,
    },
    acc: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

UserModel.hasMany(PenelitianModel);
PenelitianModel.belongsTo(UserModel, { foreignKey: "userId" });

module.exports = PenelitianModel;
