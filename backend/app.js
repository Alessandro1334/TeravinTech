require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize: db } = require('./app/models/index')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

// Use Package Init
// app.use('/public/images/', express.static(path.join(__dirname, 'public/images/')))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(routes)

app.get("/", (req, res) => {
    res.json({
        message: `User is online at port ${port}!`
    })
})

// Server Port Init
async function start() {
    try {
        await db.authenticate()
        app.listen(port, () => {
            console.log(`Server running in port ${port}`)
        })
    } catch (err) {
        console.log('An error occured during connecting database:', err)
    }
}
start()
