// const JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// const { SECRET_KEY } = require("../config");
// const passport = require("passport");
// const jwt = require('jsonwebtoken')

// function jwtAuth(tok) {
//   var opts = {};
//   opts.jwtFromRequest = tok;
//   opts.secretOrKey = SECRET_KEY;
//   // opts.issuer = 'accounts.examplesoft.com';
//   // opts.audience = 'yoursite.net';
// //   const accessToken = jwt.verify(tok, SECRET_KEY);
//     // console.log(accessToken,'==<<')
   
//   passport.use(
//     passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//         User.findOne({id: jwt_payload.sub}, function(err, user){
//                   console.log(jwt_payload,'==><<<>')
// //         return done(err, false);
// //         if (err) {
// //         }
// //         if (user) {
// //           return done(null, user);
// //         } else {
//     //         }
// });
// })
// )
// );
// }

// module.exports = {jwtAuth};
