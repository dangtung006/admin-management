const { router }           = require("../init/my-app")();


const RouterList = [
    {
        'route' : '/',
        'class' : require("./modules/main")
    },
    {
        'route' : '/product',
        'class'  : require('./modules/product')
    },

    {
        'route' : '/client',
        'class'  : require('./modules/client')
    },

    {
        'route' : '/blog_cate',
        'class'  : require('./modules/blog_cate')
    },

    {
        'route' : '/blog',
        'class'  : require('./modules/blog')
    },

    {
        'route' : '/author',
        'class'  : require('./modules/author')
    },

    {
        'route' : '/author_card',
        'class'  : require('./modules/authorCard')
    },

    {
        'route' : '/user',
        'class'  : require('./modules/user')
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