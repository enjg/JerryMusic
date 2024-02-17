import {
	defineStore
} from 'pinia';
import {
	reactive,
	ref,
	watch
} from "vue";

export const useMyShare = defineStore('myShare', () => {
	//是否显示
	let ShowTF = ref(false)
	//分享类别
	let ShareSort = ref(null)
	//id
	let id = ref(null);
	//分享内容类别
	let ShareContentSort = ref(null)


	//分享类别
	function ShareSortPost(sort) {
		ShareSort.value = sort;
	}
	//更新数据
	function SharePost(sort, ids) {
		console.log(sort,ids)
		ShareContentSort.value = sort;
		id.value = ids;
		PostShow()
	}
	//切换显示
	function PostShow() {
		ShowTF.value = !ShowTF.value;
	}
	return {
		ShowTF,
		PostShow,
		ShareSort,
		id,
		ShareContentSort,
		SharePost,
		ShareSortPost
	}
})