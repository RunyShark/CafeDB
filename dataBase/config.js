const mongoose = require("mongoose");
require("colors");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos online".yellow);
  } catch (error) {
    console.log(error.message);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = { dbConnection };
