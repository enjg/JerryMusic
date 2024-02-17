import {
	defineStore
} from 'pinia';
import {
	reactive,
	ref,
	watch
} from "vue";

export const useMySearch = defineStore('mySearch', () => {
	//搜索文本
	let SearchText = ref('');
	//默认搜索
	let DefaultSearch = ref('');
	//是否搜索
	let SearchTF = ref(-1);
	//搜索提示
	let Tips = ref(-1);

	watch(() => SearchText.value, (newValue) => {
		if (newValue == '') {
			SearchTF.value = -1;
			Tips.value = -1;
		}
	})
	watch(() => SearchTF.value, (newValue) => {
		if (newValue == 1) {
			Tips.value = -1;
		}
	})
	watch(() => Tips.value, (newValue) => {
		if (newValue == 1) {
			SearchTF.value = -1;
		}
	})
	return {
		SearchText,
		DefaultSearch,
		SearchTF,
		Tips
	}
})