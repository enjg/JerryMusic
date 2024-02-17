<template>
	<view class="MvList">
		<view class="DateTime">
			<p class="p">更新时间：{{getDate()}}</p>
		</view>
		<Mvblock :message={obj:item,index:index} v-for="(item,index) in listArray" :key="index"></Mvblock>
	</view>
</template>

<script setup>
	import axios from '@/axios.js';
	import Mvblock from '../MV/Mvblock.vue'
	import {
		reactive,
		defineProps,
		onMounted
	} from "vue";
	const Props = defineProps({
		message: Object,
	});
	onMounted(() => {
		getTopMv(Props.message.name);
	})
	let listArray = reactive([]);

	function getTopMv(name) {
		axios
			.get("/top/mv", {
				params: {
					limit: 50,
					area: name
				},
			})
			.then((res) => {
				listArray.push(...res.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function getDate() {
		const date = new Date();
		const currentMonth = date.getMonth() + 1;
		const currentDate = date.getDate();
		return currentMonth + '月' + currentDate + '日'
	}
</script>

<style scoped>
	.MvList {
		width: calc(100vw - 40px);
		margin-left: 20px;
		height: 100%;
		overflow-y: auto;
	}

	.DateTime {
		height: 50px;
	}

	.DateTime>.p {
		line-height: 50px;
		font-weight: bold;
		font-size: 14px;
		letter-spacing: 0.1em;
	}
</style>