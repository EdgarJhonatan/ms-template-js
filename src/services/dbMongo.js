import mongoose from "mongoose";
import config from "../config/index";

mongoose.connect(config.mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Database is connected to: ', res.connection.name);
});