const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sketch"
  });

  module.exports={db};