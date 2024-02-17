<template>
	<view class="Mvblock">
		<image mode="widthFix" @click="routerPush('/pages/VideoPlayback/index',Props.message.obj.id)" :src="Props.message.obj.cover" alt=""></image>
		<view class="content">
			<view>
				<p class="p" :class="{topThree:Props.message.index<3}">{{Props.message.index + 1}}</p>
				<view class="fair" v-if="Props.message.index+1===Props.message.obj.lastRank">
					<p class="p">-</p>
				</view>
				<view class="rise" v-if="Props.message.index+1<Props.message.obj.lastRank">
					<p class="p"> &#9650;</p>
					<p class="p">{{Props.message.obj.lastRank-(Props.message.index+1)}}</p>
				</view>
				<view class="new" v-if="Props.message.obj.lastRank===-1">
					NEW
				</view>
				<view class="junior"
					v-if="Props.message.index+1>Props.message.obj.lastRank && Props.message.obj.lastRank!==-1">
					<p class="p">&#9660;</p>
					<p class="p">{{(Props.message.index+1)-Props.message.obj.lastRank}}</p>
				</view>
			</view>
			<view class="name">
				<p class="p">{{Props.message.obj.name}}</p>
				<p class="p">{{Props.message.obj.artistName}}</p>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		onMounted
	} from "vue";
	const Props = defineProps({
		message: Object,
	});

	function routerPush(center, event) {
		wx.navigateTo({
			url: center  + '?id=' + event
		})
	}
</script>

<style scoped>
	.topThree {
		color: #ff3843 !important;
	}

	.Mvblock {
		width: 100%;
	}

	.Mvblock>image {
		width: 100%;
		border-radius: 5px;
	}

	.content {
		height: 60px;
		width: 100%;
		position: relative;
	}

	.content>view:nth-of-type(1) {
		width: 30px;
		height: 60px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.name {
		width: calc(100% - 50px);
		height: calc(100% - 20px);
		padding: 10px 0;
		position: absolute;
		left: 50px;
		top: 0;
	}

	.name>.p {
		line-height: 20px;
	}

	.name>.p:nth-of-type(1) {
		font-size: 15px;
		font-weight: bold;
		color: #303030;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.name>.p:nth-of-type(2) {
		font-size: 12px;
		font-weight: 300;
		color: #7f7f7f;
	}

	.content>view:nth-of-type(1)>.p {
		font-weight: bold;
		width: 100%;
		font-size: 22px;
		line-height: 20px;
		position: absolute;
		top: 10px;
		color: #9b999a;
		text-align: center;
	}

	.content>view:nth-of-type(1)>view {
		height: 20px;
		width: 100%;
		position: absolute;
		top: 30px;
		text-align: center;
		line-height: 20px;
	}

	.fair>.p {
		width: 30px;

	}

	.rise>.p {
		float: left;
		width: 15px;
	}

	.rise>.p:nth-of-type(1) {
		color: #f85661;
	}

	.rise>.p {
		font-size: 10px;
		font-weight: 300;
	}

	.new {
		width: 30px;
		color: #578d73;
		font-size: 7px;
		font-weight: bold;
	}

	.junior>.p {
		float: left;
		width: 15px;
	}

	.junior>.p:nth-of-type(1) {
		color: #53acee;
	}

	.junior>.p {
		font-size: 10px;
		font-weight: 300;
	}
</style>