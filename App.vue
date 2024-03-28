<script>
	// import axios from '@/axios.js';
	// import {
	// 	onMounted
	// } from "vue";
	// import {
	// 	useMyUser
	// } from '@/pinia/myUser.js'

	// // 将getRegisterAnonimous函数定义在setup函数外部
	// function getRegisterAnonimous(myUser) {
	// 	let time = Date.now();
	// 	return axios.get("/register/anonimous", {
	// 			params: {
	// 				timestamp: time,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			myUser.cookie = res.data.cookie;
	// 			console.log(res.data.cookie)
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// }

	// export default {
	// 	onLaunch: function() {
	// 		console.log('App Launch');
	// 		// 在onLaunch中调用getRegisterAnonimous函数
	// 		getRegisterAnonimous(useMyUser());
	// 	},
	// 	// ... 其他生命周期钩子

	// 	setup() {
	// 		const myUser = useMyUser();

	// 		// 在setup函数中不再定义getRegisterAnonimous函数

	// 		// 在这里可以添加其他的响应式数据、computed等

	// 		return {
	// 			myUser
	// 		}
	// 	}
	// };
</script>

<style>
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
	}

	/* 
	/deep/ {
		filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		filter: grayscale(100%);
		filter: gray;
	} */
</style>