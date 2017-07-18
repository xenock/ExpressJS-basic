const express = require("express")
const authRoutes = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const ensureLogin = require("connect-ensure-login")
const User = require("../models/User")

// authRoutes.get("/matches", ensureLogin.ensureLoggedIn(), (req, res) => {
//   Match.find({status: {$ne: 'FINISHED'}}, (err, matches) => {
//     if (err) { return next(err) }
//     return res.render('matches', {matches: matches, user: req.user});
//   }).sort({date: 1}).limit(10)
// })

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup")
})

authRoutes.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/login',
  failureRedirect : '/signup'
}))

authRoutes.get('/login',ensureLogin.ensureLoggedOut('/'), (req, res) => {
    res.render('auth/login')
})

authRoutes.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login'
}))

authRoutes.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/login")
})

// authRoutes.get("/auth/facebook", passport.authenticate("facebook"))
// authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
//   successRedirect: "/matches",
//   failureRedirect: "/"
// }))


// authRoutes.get("/auth/google", passport.authenticate("google", {
//   scope: ["https://www.googleapis.com/auth/plus.login",
//           "https://www.googleapis.com/auth/plus.profile.emails.read"]
// }))
//
// authRoutes.get("/auth/google/callback", passport.authenticate("google", {
//   failureRedirect: "/signup",
//   successRedirect: "/matches"
// }))
/////////

/*authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup")
})

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" })
      return
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = User({
      username: username,
      password: hashPass
    })

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" })
      } else {
        res.redirect("/")
      }
    })
  })
})*/

module.exports = authRoutes
