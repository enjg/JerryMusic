import {
	defineStore
} from 'pinia';
import {
	reactive,
	ref,
	watch
} from "vue";

export const useMyUser = defineStore('myUser', () => {
	//登录cookie
	let cookie = ref(null);
	//用户详情
	let profile = reactive({})

	return {
		cookie,
		profile
	}
})