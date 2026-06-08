import { createRouter, createWebHistory } from "vue-router";
import HeroPage from "../components/HeroPage.vue";
import LoveEnergyPage from "../pages/LoveEnergyPage.vue";
import Login from "../pages/login.vue";
import supabase from '../supabase/index.js'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HeroPage },
    { path: "/draw/love-energy", name: "love-energy", component: LoveEnergyPage },
	{ path: "/login", name: "login", component: Login},
  ],
});
router.beforeEach((to, from, next) => {
	const queryToken = to.query.token?to.query.token:"000000";
	const localToken = localStorage.getItem('token');
	if(to.path=="/"&&queryToken!="000000"){
		supabase
		  .from('page_tokens')
		  .select("*").eq("token",queryToken)
		  .then(({ data, error }) => {
		    if (data.length==0) {
			    next(`/login`);
		    } else {
				localStorage.setItem("token", queryToken);
		        next({ path: '/'});
		    }
		  })
	}
	else if(localToken){
		next();
	}
	else{
		next(`/login`);
	}
	// next()
  // const token = localStorage.getItem('token')?"":localStorage.getItem('token');
  // if (to.meta.requiresAuth && !token) {
  //   // 未登录，重定向到登录页，并记录原目标路径
  //   next({ path: '/login', query: { redirect: to.fullPath } });
  // } else {
  //   next(); // 放行
  // }
});

export default router;
