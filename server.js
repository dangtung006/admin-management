
const dbConfigs      = require("./util/configs/process").getProcess("db");
const initGlobal     = require("./init/global");
const myDB           = require("./init/db.js")(dbConfigs);
const app            = require("./init/my-app.js")();

async function main(){
    try{
        //await myDB.load();
        initGlobal();
        app.run();
    
        app.applyHttpReq('/test', 'get', 
            function(req, res){
                return res.send("ok")
            },
            [
                function(req, res, next){
                    console.log("this is middlewares 01");
                    return next();
                },
        
                function(req, res, next){
                    console.log("this is middlewares 02");
                    return  next();
                }
            ]
        );
        
    }catch(e){
        console.warn('--> Run', error);
        process.exit(1);
    }
}

main();

// const express      = require("express");
// const app          = express();
// const http         = require('http').Server(app);
// const io           = require('socket.io')(http, {
//     cors : { origin : "*" }
// });

// const cors         = require("cors");
// const FILE         = require('./util/file');
// const session      = require("express-session");
// const passport     = require("passport");
// const initPassport = require("./init/passport");
// const { isAuth}    = require("./middlewares/authen");
// passport.use()

// // app.use(cors({
// //     origin: 'http://127.0.0.1:3000',
// //     methods: ['PUT']
// // }));

// app.use(session({ resave: true, saveUninitialized: true, secret : "secret", cookie : {}, store  : session.MemoryStore() }));
// app.use(express.json());
// app.use(express.urlencoded({extended : true}));
// // inital config system;
// initPassport(app, passport);

// // routes
// app.post("/test", async (req, res)=>{
//     return res.send({
//         message : "Post request for testing",
//         data : req.body
//     });
// });

// app.get("/person", async (req, res)=>{
//     return res.send({
//         message : "Get request with query person",
//         data : req.query
//     })
// });

// app.get("/user/:nation/:id", async (req, res)=>{
//     return res.send({
//         message : "Get request with params person",
//         data : req.params
//     })
// })

// app.get("/user/list", async (req, res)=>{
//     return res.send({
//         message : "Success",
//         data : [
//             {
//                 name : "John",
//                 age : "38"
//             },
//             {
//                 name : "Peter",
//                 age : "28"
//             }
//         ]
//     })
// })


// // render page routes
// app.get("/", isAuth, async (req, res)=>{
//     res.sendFile(__dirname + "/views/index.html");
// });

// app.get("/user/profile", isAuth, async (req, res)=>{
//     res.sendFile(__dirname + "/views/user/index.html");
// });


// app.get("/chat", isAuth, async (req, res)=>{
//     res.sendFile(__dirname + "/views/user/chat.html");
// })

// app.get("/login", async (req, res)=>{
//     res.sendFile(__dirname + "/views/login.html");
// });

// app.post(
//     "/login",
//     passport.authenticate("local", { failureRedirect: '/login'}), 
//     (req, res)=>{
//         res.redirect('/user/profile');
//     }
// )

// app.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });

// app.get("/register", async (req, res)=>{
//     res.sendFile(__dirname + "/views/register.html");
// });

// app.post("/register", async (req, res)=>{
//     let { email, password } = req.body;
//     await FILE.saveObj2JsonDB("users", email, { email, password });
//     let user = await FILE.loadObjsFromJsonDb("users", email);
//     if(!user) return res.send("failed to register user");
//     return res.redirect("/login");
// });

// io.use((socket, next)=>{
//     const { token } = socket.handshake.headers;
//     if(token &&  token == "bear::123") return next();
//     return next(new Error("invalid connect"));
// });

// io.on('connection', (socket)=>{
//     socket.on("chat", (msg) =>{
//         io.emit('chat', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log(`User disconnect id is ${socket.id}`);
//     });
// })

// http.listen(3001, () => {
//     console.log(`Socket.IO server running at http://localhost:3001/`);
// });