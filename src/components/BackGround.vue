<template>
	<div id="starfield-wrap">
		<canvas id="starfield" ref="canvas"></canvas>
	</div>
</template>

<script setup>
	import Starfield from '../assets/Starfield.js';
	import { createApp, ref, onMounted } from 'vue';
	const canvas = ref(null);
	
	onMounted(() => {
	  // canvas.value = document.getElementById('starfield');
	  const starfield = new Starfield(canvas.value);
	  starfield.start();
	});
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

html,
body {
	width: 100%;
	min-height: 100%;
	background: #18161d;
	color: #eceae6;
	font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

#starfield-wrap {
	position: fixed;
	inset: 0;
	z-index: 1;
	pointer-events: none;
	overflow: hidden;
	background: #18161d;
}

#starfield {
	display: block;
	width: 100%;
	height: 100%;
}
</style>
