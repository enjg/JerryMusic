<template>
	<view class="load">
		<view class="content">
			<view class="block class1"></view>
			<view class="block class2"></view>
			<view class="block class3"></view>
			<view class="block class4"></view>
			<p class="p">加载中...</p>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.load {
		width: 100vw;
		height: 80px;
		display: inline-block;
		position: relative;
	}

	.content {
		width: 100px;
		height: 25px;
		position: absolute;
		top: 10px;
		left: calc(50% - 20px);
		transform: translateX(-50%);
	}

	.block {
		width: 2.5px;
		background-color: red;
		position: absolute;
		bottom: 0;
	}

	.class1 {
		left: 0;
		animation: breathingAnimation1 0.3s infinite;
	}

	.class2 {
		left: 7.5px;
		animation: breathingAnimation2 0.5s infinite;

	}

	.class3 {
		left: 15px;
		animation: breathingAnimation3 0.4s infinite;
	}

	.class4 {
		left: 22.5px;
		animation: breathingAnimation4 0.4s infinite;
	}
	.content>.p{
		margin: 0;
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 16px;
		line-height: 12px;
	}
	@keyframes breathingAnimation1 {

		0%,
		100% {
			height: 60%;
		}

		50% {
			height: 80%;
		}
	}

	@keyframes breathingAnimation2 {

		100%,
		0% {
			height: 50%;
		}

		50% {
			height: 90%;
		}
	}

	@keyframes breathingAnimation3 {

		100%,
		0% {
			height: 20%;
		}

		50% {
			height: 100%;
		}
	}

	@keyframes breathingAnimation4 {

		100%,
		0% {
			height: 50%;
		}

		50% {
			height: 60%;
		}
	}
</style>