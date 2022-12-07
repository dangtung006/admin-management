
const {Server}       = require("http");
const validOrigin    = ['http://localhost:3000', "http://localhost:3001"];

const { 
    checkOrigin, 
    authenByPassport,
    wrap 
}  = require("../middlewares/socket");

const sessionMiddleware = require("../middlewares/session");

class SOCKET_HELPER {
    constructor(server){
        server.listen(3000, ()=>{
            console.log("server listen at port" , 3000);
        });

        this.io = require("socket.io")(
            server,
            {
                origin: validOrigin,
                methods: ["GET", "POST"], 
                credentials: true
            }
        );

        this.onlineList   = [];
        this.connectUser  = "";
    }

    initSocket(namespaceKey){
        this.namespaceKey = namespaceKey ? namespaceKey : null;
        this.namespace =  this.namespaceKey ? this.io.of(`/${this.namespaceKey}`) : this.io;
        this.applyMiddleware();
        this.setupClient();
    }

    applyMiddleware(){
        this.namespace.use(checkOrigin);
        this.namespace.use(wrap(sessionMiddleware));
        this.namespace.use(authenByPassport);
    }

    setupClient(){
        this.namespace.on("connection", (client)=>{
            const { user } = client.request.session.passport;
            console.log("user : " , user);
            client.leave(client.id);
            client.join(user);
            this.connectUser = user;
            this.initActiveUsers();
            this.handleEvent(client);
        });
    }

    initActiveUsers(){
        //io.sockets.adapter.rooms;
        var currentZooms = this.namespace.adapter.rooms;
        for (const item of currentZooms.keys()) {
            if(this.onlineList.indexOf(item) < 0 ){
                this.onlineList.push(item);
            }
        }
    }

    handleEvent(client){
        let self = this;

        client.on("private-chat", async({ from, to, msg })=>{
            // console.log("from : " , from);
            // console.log("to : " , to);
            // console.log("msg : " , msg);
            // self.namespace.to(from).to(to).emit("send-private", msg);
        });

        client.on('disconnect', function () {
            //console.log(self.onlineList);
        });
    }
}

module.exports = function(app, namespaceKey){
    new SOCKET_HELPER(Server(app)).initSocket(namespaceKey);
};