const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const config = require('dotenv')

config.config({ path: './config/config.env' })

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')

// Routes
app.use('/', require('./controllers/auth/home'))
app.use('/auth', require('./controllers/auth/auth'))



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})