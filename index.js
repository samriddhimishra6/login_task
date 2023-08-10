const Sequelize = require("sequelize");

const sequelize = new Sequelize("firstdb", "root", "taylorswift13", {
  dialect: "mysql",
});

const DataTypes = Sequelize.DataTypes;

async function myFunction() {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Connection error:", error);
  }
}

myFunction();

const User = sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

async function fetchData() {
  try {
    // Sync the model with the database (ensure the table exists)
    await User.sync();

    // Fetch all users from the table
    const users = await User.findAll();

    // Extract only the relevant data from each user instance
    const userData = users.map((user) => user.get({ plain: true }));

    console.log(userData);
  } catch (err) {
    console.log("Error:", err);
  }
}

fetchData();