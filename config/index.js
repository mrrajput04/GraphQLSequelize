 require('dotenv').config();

module.exports = {
    PORT:process.env.PORT,
    DB:process.env.DB,
    PASSWORD:process.env.PASSWORD,
    SECRET_KEY:process.env.SECRET_KEY,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
}