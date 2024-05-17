import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
// 1. 引入vue-router
import { createRouter, createWebHistory } from 'vue-router';
import TeamsFooter from './components/nav/TeamsFooter.vue';
import UsersFooter from './components/nav/UsersFooter.vue';

// 2.配置router信息
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 针对主界面的重定向
    { name: 'main', path: '/', redirect: '/teams' }, // 访问/会被转到/teams
    {
      name: 'teams',
      path: '/teams',
      // component: TeamsList,
      components: {
        // 当一个组件有多个router-view时，通过components编写key-value来确认渲染位置，没有name属性的router-view就是default
        default: TeamsList,
        footer: TeamsFooter,
      },
      // alias: '/', // 也可以通过配置别名，让路径 / 也渲染 TeamsList
      // 使用子路由时，父路径会添加linkActiveClass对应的class
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          //   meta数据将被携带在路由守卫的to、from参数里
          //   可以用来携带是否校验的标识
          meta: {
            info: 'this is meta',
            needAuth: true,
          },
          props: true,
          //   路由守卫用于路由转入判断
          beforeEnter(to, from, next) {
            console.log(to); // 目标路由地址
            console.log(from); // 来源路由地址
            next(); // 放行
          },
        },
      ],
    },
    {
      name: 'users',
      path: '/users',
      // component: UsersList,
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
    },
    // 动态路由
    // 修改为子路由
    // {
    //   name: 'teamMembers',
    //   path: '/teams/:teamId',
    //   component: TeamMembers,
    //   props: true, // 表示将路由中的动态参数通过props传入组件
    // },
    // 处理所有不存在的路径
    {
      name: 'notFound',
      path: '/:notFound(.*)', // .*正则表达式，匹配所有路径
      component: NotFound,
    },
  ],
  // 实现通过历史回到上个界面的时候，位置仍然处于当时回退时的位置，提升体验
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
  // 绑定active的菜单项添加的class
  linkActiveClass: 'active',
});
// 全局路由守卫，对所有路由都会生效
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    console.log('权限校验');
    next();
  } else {
    console.log('无需权限校验');
    //   不调用next就不会放行
    next();
  }
  console.log(to);
  console.log(from);
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log(to, from);
  console.log('router after guard');
});

export default router;
