module.exports = app => {

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const eventRoutes = require("./event.routes");
    app.use("/events", eventRoutes);

    const artistRoutes = require("./artist.routes");
    app.use("/artists", artistRoutes);

    const userRoutes = require("./user.routes");
    app.use("/", userRoutes);

    const apiRoutes = require("./api.routes");
    app.use("/api", apiRoutes);

}