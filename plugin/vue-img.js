/**
 * Created by evoli on 2016/9/6.
 */
var VueImg=Vue.extend({
    props:['src','width','height'],
    template:'<div class="img-container" :style="divStyle"><img class="img" :style="imgStyle" src="{{src}}"></div>',
    data:function(){
        return{
            divStyle:{
                width:this.width,
                height:this.height,
                position:'relative',
                overflow:'hidden'
            },
            imgStyle:{
                minWidth: '100%',
                minHeight:'100%',
                width:'auto',
                height:'auto',
                position:'absolute',
                left:'0',
                right:'0',
                top:'0',
                bottom:'0',
                margin:'auto'
            }
        }
    },
    ready:function(){
        var divWidth=parseInt(this.width);
        var divHeight=parseInt(this.height);
        var imgWidth=$('.img').width();
        var imgHeight=$('.img').height();
        if(divWidth*imgHeight>divHeight*imgWidth){
            this.imgStyle.width='100%';
            this.imgStyle.height='auto';
        }else{
            this.imgStyle.width='auto';
            this.imgStyle.height='100%';
        }
    }
})

Vue.component('v-img',VueImg);