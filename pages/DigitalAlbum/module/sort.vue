<template>
	<view class="sort">
		<view class="" @click="routerPush('/pages/BestSellerList/index')">
			<view class="image">
				<image src="../img/畅销榜.png" mode=""></image>
			</view>
			<p class="p">畅销榜</p>
		</view>
		<view class="" @click="routerPush('/pages/LanguageStyleAlbum/index')">
			<view class="image">
				<image src="../img/语种风格馆.png" mode=""></image>
			</view>
			<p class="p">语种风格馆</p>
		</view>
		<view class="">
			<view class="image">
				<image src="../img/数字藏品.png" mode=""></image>
			</view>
			<p class="p">数字藏品</p>
		</view>
		<view class="">
			<view class="image">
				<image src="../img/已购.png" mode=""></image>
			</view>
			<p class="p">已购</p>
		</view>
	</view>
</template>

<script setup>
	function routerPush(center){
		wx.navigateTo({
			url: center
		})
	}
</script>

<style scoped>
	.sort {
		width: 100vw;
		height: 20vw;
		margin-top: 20px;
	}

	.sort>view {
		width: 25vw;
		height: 20vw;
		float: left;
		position: relative;
	}
	.image{
		width: 13vw;
		height: 13vw;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;
		background-color: #f04a3e;
		 box-shadow: 0px 0px 15px #f74c40;
	}
	.image>image{
		width: 8vw;
		height: 8vw;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.sort>view>.p{
		width: 100%;
		height: 7vw;
		line-height: 7vw;
		position: absolute;
		bottom: 0;
		text-align: center;
		color: #2e332d;
		font-size: 25rpx;
	}
</style>