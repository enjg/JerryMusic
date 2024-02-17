<template>
	<view class="Review_content_center">
<!-- 		{{Props.event.content}} -->
		<view class="image">
			<image @click.stop="routerPush(Props.event.user.userId)" :src="Props.event.user.avatarUrl" mode="heightFix">
			</image>
		</view>
		<view class="details">
			<view class="name">
				<view class="UserDetails">
					<p class="p">{{Props.event.user.nickname}}</p>
					<p class="p">{{formatTimestampToDateString(Props.event.time)}}</p>
				</view>
				<view class="giveLike">
					<image src="@/static/Universalimage/点赞2.png" mode=""></image>
					<p class="p">{{Props.event.likedCount}}</p>
				</view>
			</view>
			<view class="content">
				<p class="p">{{Props.event.content}}</p>
			</view>

		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		onMounted
	} from 'vue';
	const Props = defineProps({
		event: Object
	})

	function routerPush(event) {
		wx.navigateTo({
			url: '/pages/UserDetails/index' + '?id=' + event
		})
	}
	function formatTimestampToDateString(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		return year + '-' + month + '-' + day;
	}
</script>

<style scoped>
	.Review_content_center {
		width: calc(100vw - 40px);
		padding: 0px 20px;
		position: relative;
		content: "";
		display: table;
		clear: both;
		margin-top: 10px;
	}

	.Review_content_center:nth-of-type(2n) {}

	.Review_content_center>.image {
		width: 35px;
		height: 35px;
		background-color: olivedrab;
		border-radius: 50%;
		float: left;
		position: relative;
		overflow: hidden;
	}

	.Review_content_center>.image>image {
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.Review_content_center>.details {
		width: calc(100% - 50px);
		float: left;
		margin-left: 10px;
		border-bottom: 1px solid #e9e9e9;
		/* 		padding: 10px 0; */
		padding-bottom: 10px;
	}

	.Review_content_center>.details>.name {
		width: 100%;
		height: 35px;
		position: relative;
	}

	.Review_content_center>.details>.name>.UserDetails {
		width: calc(100% - 80px);
		height: 100%;
		position: absolute;
		left: 0;
	}

	.Review_content_center>.details>.name>.UserDetails>.p:nth-of-type(1) {
		line-height: 25px;
		font-size: 14px;
		color: #676566;
		font-weight: bold;
	}

	.Review_content_center>.details>.name>.UserDetails>.p:nth-of-type(2) {
		line-height: 10px;
		font-size: 10px;
		color: #a19fa0;
	}

	.Review_content_center>.details>.name>.giveLike {
		width: 80px;
		height: 100%;
		position: absolute;
		right: 0;
		display: inline-block;
	}
	.Review_content_center>.details>.name>.giveLike>image{
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	.Review_content_center>.details>.name>.giveLike>.p {
		font-weight: 300;
		font-size: 12px;
		line-height: 35px;
		position: absolute;
		right: 25px;
		text-align: right;
	}

	.Review_content_center>.details>.content {
		width: 100%;
		margin-top: 10px;
	}

	.Review_content_center>.details>.content>.p {
		font-size: 14px;
		line-height: 25px;
		color: #343440;
	}
</style>