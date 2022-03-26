const {connect} = require("mongoose");


module.exports.connectDB = async () => {
    try {
        let con = await connect(process.env.DBURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB Connected: ${con.connection.host}`);
    }
    catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}