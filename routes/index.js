module.exports = app => {

    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const eventRoutes = require("./event.routes");
    app.use("/", eventRoutes);

    const artistRoutes = require("./artist.routes");
    app.use("/", artistRoutes);

    const userRoutes = require("./user.routes");
    app.use("/", userRoutes);

    const apiRoutes = require("./api.routes");
    app.use("/", apiRoutes);

}