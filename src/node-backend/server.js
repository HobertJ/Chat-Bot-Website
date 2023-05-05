const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require("./router.js");

const PORT = 5000;

const app = express();

app.use(cors());

app.use(cors({
  methods: 'GET,POST,PUT,DELETE'
}));

// Allow specific headers
app.use(cors({
  allowedHeaders: 'Content-Type,Authorization'
}));

// Allow credentials
app.use(cors({
  credentials: true
}));

// Set max age
app.use(cors({
  maxAge: 86400 // 24 hours
}));

// Handle preflight requests
app.options('*', cors());

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// ADD ROUTES
router(app);

// PUT BACKEND ON PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});