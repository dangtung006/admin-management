const RouterAccount        = require('./account');
const { router }           = require("../init/my-app")();


const RouterList = [
    {
        'route' : '/',
        'class' : require("./main")
    },
    {
        'route' : '/product',
        'class'  : require('./product')
    },

    {
        'route' : '/client',
        'class'  : require('./client')
    },

    {
        'route' : '/blog_cate',
        'class'  : require('./blog_cate')
    },

    {
        'route' : '/blog',
        'class'  : require('./blog')
    },

    {
        'route' : '/author',
        'class'  : require('./author')
    },

    {
        'route' : '/author_card',
        'class'  : require('./authorCard')
    }
]


class AppRouter {
    constructor(){
        this.appRouter  = router;
        for(let idx=0; idx < RouterList.length; idx++){
            this.appRouter.use(RouterList[idx].route, new RouterList[idx]['class']().router );
        }

    }
}   

module.exports = AppRouter;