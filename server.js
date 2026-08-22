const {app,connectDB} = require("./app");
connectDB()
app.listen(process.env.PORT,()=>{
    console.log("Server is Running");
});