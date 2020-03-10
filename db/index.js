/*const Sequelize = require("sequelize");
const sequelize = new Sequelize("notes-app", "postgres", "1111", {
  dialect: "postgres"
});*/
const URL =
  "postgres://evbpjhypvrkidl:ccb677278d33d1a5c8f15c5b8dacdc798ed2c19058adee16ace761811c167389@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d62l46vn1800pf";

const Sequelize = require("sequelize");
const match = URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
sequelize = new Sequelize(match[5], match[1], match[2], {
  dialect: "postgres",
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  },
  protocol: "postgres",
  port: match[4],
  host: match[3],
  ssl: true
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
  }
});

async function getPersonalNotes(user) {
  user.email = user.email.replace(/\.|@/g, "");
  const PersonalNotes = sequelize.define(`${user.email}`, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    note_content: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });
  await sequelize.sync();
  return PersonalNotes;
}

module.exports = { User, Notes, getPersonalNotes };
