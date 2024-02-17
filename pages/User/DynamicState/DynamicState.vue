<template>
	<scroll-view class="DynamicState">
		<DynamicStateBlockOne v-for="(item,index) in eventArray" :key="index" :message="item"></DynamicStateBlockOne>
	</scroll-view>
</template>

<script setup>
	import DynamicStateBlockOne from '../../module/DynamicStateBlock/DynamicStateBlockOne.vue';
	import axios from '@/axios.js';
	import {
		useMyUser
	} from '@/pinia/myUser.js'
	import {
		onMounted,
		reactive
	} from 'vue';
	const myUser = useMyUser();

	onMounted(() => {
		getUserEvent()
	})
	let eventArray = reactive([]);

	function getUserEvent() {
		axios
			.get("/user/event", {
				params: {
					uid: 8866570372
				}
			})
			.then((res) => {
				eventArray.push(...res.data.events)
				console.log(eventArray)
				// console.log(res.data.events);
				// for (let i = 0; i < res.data.events.length; i++) {
				// 	console.log(res.data.events[i])
				// 	JsonStringObj(res.data.events[i].json)
				// }
			})
			.catch((err) => {
				console.error(err);
			});
	}


</script>

<style scoped>
	.DynamicState {
		width: 100%;
		height: 100%;
	}
</style>