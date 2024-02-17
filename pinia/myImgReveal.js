import {
	defineStore
} from 'pinia';
import {
	reactive,
	ref,
	watch
} from "vue";

export const useMyImgReveal = defineStore('myImgReveal', () => {
	//当前显示图片
	let img = ref('');
	//图片列表数组
	let imgArray = reactive([]);


	//更改数据
	function postImg(event, Array) {
		wx.previewImage({
			current: event, // 当前显示的图片链接  
			urls: Array
		});
	}

	return {
		postImg
	}
})