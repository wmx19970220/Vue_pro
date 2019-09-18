import router from './index'

const routerGlobal = {
    init() {
        router.beforeEach((to, from, next) => {
            const token = localStorage.getItem('token')
            if (token && to.path === '/mine/login') {
                next({
                    name: 'home',
                    params: {
                        flag: true
                    }
                });
            } else if (token || to.path === '/mine/login' || to.path === '/mine/register' || to.path === '/error') {
                next(true)
            } else {
                next('/error')
            }
        })
    }
}


export default routerGlobal