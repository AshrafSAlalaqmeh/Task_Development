require("dotenv/config");
const {setupDatabaseSession} = require('./config/database/databaseConfig');
const app = require("./app");
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Api is working fine on port ${PORT}`);
  setupDatabaseSession()
});
