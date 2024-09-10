import express from "express";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.get("/", (req, res) => {
        res.send("Welcome to api set up by node-nitro ^_+");
    });
}

app.listen(PORT, () => {
    console.info(`-> now listening at http://localhost:${PORT}/`);
});
