const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  port: match[4],
  port: match[3],
  logging: true
});

const User = sequelize.define("users", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true
  },
  username: {
    type: Sequelize.CHAR,
    allowNull: true
  },
  password: {
    type: Sequelize.CHAR,
    allowNull: true
  },

  email: {
    type: Sequelize.CHAR,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.TIME,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.TIME,
    allowNull: true
  }
});

const Notes = sequelize.define("notes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true
  },
  note_content: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.TIME,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.TIME,
    allowNull: true
  }
});

module.exports = { User, Notes };
