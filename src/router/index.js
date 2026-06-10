import { createRouter, createWebHistory } from "vue-router";
import HeroPage from "../components/HeroPage.vue";
import LoveEnergyPage from "../pages/LoveEnergyPage.vue";
import SingleCardPage from "../pages/SingleCardPage.vue";
import Login from "../pages/login.vue";
import supabase from '../supabase/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HeroPage },
    { path: "/draw/love-energy", name: "love-energy", component: LoveEnergyPage },
    { path: "/draw/single-card", name: "single-card", component: SingleCardPage },
	{ path: "/login", name: "login", component: Login},
  ],
});
router.beforeEach((to, from, next) => {
	const queryToken = to.query.token?to.query.token:"000000";
	const localToken = localStorage.getItem('token');
	if(to.path=="/login"){
		next();
	}
	else if(to.path=="/"&&queryToken!="000000"){
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
});
export default router;
