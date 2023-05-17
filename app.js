// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "your-favorite-music-events";

app.locals.appTitle = `Music Events`;

app.use((req, res, next) => {
    app.locals.currentUser = req.session.currentUser
    if (req.session.currentUser) {
        app.locals.isAdmin = req.session.currentUser.role === "ADMIN"
        app.locals.isPlanner = req.session.currentUser.role === "PLANNER"
    }
    next()
})

    
// const loggedUser = require('./middlewares/loggedUser.middleware')
// app.use(loggedUser)



// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/", eventRoutes);

const artistRoutes = require("./routes/artist.routes");
app.use("/", artistRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const apiRoutes = require("./routes/api.routes");
const loggedUser = require("./middlewares/loggedUser.middleware");
app.use("/", apiRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
