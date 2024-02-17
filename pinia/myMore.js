import {
	defineStore
} from 'pinia';
import {
	reactive,
	ref,
	watch
} from "vue";

export const useMyMore = defineStore('myMore', () => {
	//是否显示
	let TF = ref(false);
	//歌曲详情
	let id = ref(null);

	return {
		TF,
		id
	}
})