module.exports = {
  development: {
    username: process.env.DATABASES_USERNAME,
    password: process.env.DATABASES_PASSWORD,
    database: process.env.DATABASES_NAME,
    host: process.env.DATABASES_HOST,
    dialect: "mysql",
  },
};
