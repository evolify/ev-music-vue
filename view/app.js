var $=require('jquery');
const ipcRenderer=require('electron').ipcRenderer;
const player=require('./utils/player');
var Vue=require('vue/dist/vue.min.js');
var app=new Vue({
    el:'.container',
    data:{
        musics:[1,2,3,4,5,6,7],
        keywords:'',
        curMusic:null,
        curIndex:-1,
        currentTime:'0:00',
        duration:'0:00',
        status:''
    },
    mounted:function(){
        var fs=require('fs');
        // this.musics=fs.readdirSync('F:\音乐')
        // 	.filter(file=>{
        // 		return /.mp3$/i.test(file);
        // 	});
        this.query('董贞');
        ipcRenderer.on('query-result',(event,arg)=>{
            this.musics=arg;
            switchMusic(0);
            player.init(controller);
        })
    },
    methods:{
        exit:()=>{
            ipcRenderer.send('exit');
        },
        query:(keywords)=>{
            console.log(keywords);
            ipcRenderer.send('query',{keywords:keywords});
        },
        musicItemClick:(index,event)=>{
            switchMusic(index);
            play();
            $('.music-item .music').css('color',"black");
            $(event.target).children('.music').css('color','#00a0f0');
        },
        playBtnClick:()=>{
            play(app.curMusic.audio);
        }
    }
});

function switchMusic(index){
    if(index>=app.musics.length){
        index=0;
    }
    app.curIndex=index;
    app.curMusic=app.musics[index];
    $('.bg-layer').css("background","url("+app.curMusic.picUrl+")");
}
function play(){
    player.play(app.curMusic.audio);
}

var controller={
    updateTime:(time)=>{
        app.currentTime=toTimeStr(time);
    },
    onPlay:()=>{
        if(app.status!=='paused'){
            $('.img-music').addClass('rotate');
        }
        
        $('.img-music').css('animation-play-state','running');
        app.status='played';
    },
    onPause:()=>{
        app.status='paused';
        $('.img-music').css('animation-play-state','paused');
    },
    onEnd:()=>{
        app.status='ended';
        $('.img-music').removeClass('rotate');
        switchMusic(app.curIndex+1);
        play();
    },
    onDurationChange:(duration)=>{
        app.duration=toTimeStr(duration);
    }
}

function toTimeStr(second){
    var m=parseInt(second/60);
    var s=parseInt(second%60);
    return (m<10 ? '0'+m : m)+':'+(s<10 ? '0'+s : s) ; 
}