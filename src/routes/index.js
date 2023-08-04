const fs = require("fs");
const { Router } = require("express");
const router = Router();

const authRoute = require("./auth");

router.use("/", authRoute);

router.use('/upload', (req, res) => {
    const fileName = req.query.fileName
     
    req.on('data', (chunk) => {
        console.log(`Appending ${fileName}...`)
        fs.appendFileSync(fileName, chunk)
    })
 
    return res.end('successfully file uploaded!')
})

fs.readdirSync(`${__dirname}/`).filter((f) => {
    const routeFile = f.split(".").slice(0, -1).join(".").toString();

    return routeFile !== "index" && routeFile !== "auth" && f !== ".DS_Store"
        ? router.use(`/${routeFile}`, require(`./${routeFile}`))
        : null;
});
// 404
router.use("*", (req, res) => {
    res.status(404).json({
        erros: {
            msg: "URL_NOT_FOUND",
        },
    });
});

module.exports = router;
