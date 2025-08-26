"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const { User, post, comments } = db;

// A User can have many BlogPosts
// A BlogPost belongs to a single User
User.hasMany(post, { foreignKey: "userId" });
post.belongsTo(User, { foreignKey: "userId" });

// A User can write many Comments
// A Comment belongs to a single User
User.hasMany(comments, { foreignKey: "userId" });
comments.belongsTo(User, { foreignKey: "userId" });

// A BlogPost can have many Comments
// A Comment belongs to a single BlogPost
post.hasMany(comments, { foreignKey: "postId" });
comments.belongsTo(post, { foreignKey: "postId" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
