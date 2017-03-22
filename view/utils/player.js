const $=require('jquery');
const audio=document.createElement('audio');
var controller;



module.exports={
	init:(ctrl)=>{
		controller=ctrl;
		$(audio).on('timeupdate',()=>{
			ctrl.updateTime(audio.currentTime);
		}).on('ended',()=>{
			console.log('$  ended');
			ctrl.onEnd();
		}).on('play',()=>{
			console.log('$  play');
			ctrl.onPlay();
		}).on('pause',()=>{
			console.log('$  pause');
			ctrl.onPause();
		}).on('durationchange',()=>{
			ctrl.onDurationChange(audio.duration);
		})
	},
	play:(src)=>{
		if(audio.src!==src){
			audio.src=src;
			audio.play();
		}else{
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		}
		return audio.played;
	},
	isPlaying:audio.play,
	ifPaused:audio.pause,
	duration:audio.duration,
	currentTime:audio.currentTime
}