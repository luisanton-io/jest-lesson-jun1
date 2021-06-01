import mongoose from "mongoose"
import server from "./server.js"

mongoose
    .connect(process.env.ATLAS_URL + "prd", { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to Atlas!")
        server.listen(3000, () => {
            console.log("Server listening on port 3000")
        })
    })
    .catch(error => console.trace(error))