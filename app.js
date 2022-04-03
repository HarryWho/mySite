const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const config = require('dotenv')
const { ConnectDB } = require('./config/ConnectMongo')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
config.config({ path: './config/config.env' })
const app = express()
const http = require('http')
const server = http.createServer(app)

const { Server } = require('socket.io')
const io = new Server(server)

app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout')
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
  // session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

const { dateFormat } = require('./middleware/format')
app.use((req, res, next) => {
  res.locals.dateFormat = dateFormat;
  io.on('connection', (socket) => {
    socket.name = req.user.displayName
    socket.emit('newconnection', socket.name)


  })
  next()
})


// Routes
const homeRoute = require('./controllers/auth/home')
const authRoute = require('./controllers/auth/auth')
const dashboardRoute = require('./controllers/logedin/dashboard')

const { ensureGuest, ensureUser } = require('./middleware/auth')
app.use('/', homeRoute)
app.use('/auth', authRoute)
app.use('/dashboard', ensureUser, dashboardRoute)
app.use('/settings', ensureUser, require('./controllers/logedin/settings/settings'))
app.use('/article', ensureUser, require('./controllers/logedin/article/article'))


// start Mongo
ConnectDB()

// start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})