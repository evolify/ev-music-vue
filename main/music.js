const config=require('../config');
const {net}=require('electron');
const querystring=require('querystring');

const MusicUtil={
    query:(keywords,callback)=>{
        // const request=net.request({
        //     url:config.serverUrl,
        //     body:{
        //         type:1,
        //         s:keywords,
        //         limit:50,
        //         offset:0
        //     }
        // });
        var qstr=querystring.stringify({
            type:1,
            limit:50,
            s:keywords
        });
        const request=net.request(config.serverUrl+qstr);
        request.on('response',response=>{
            var result='';
            response.on('data',data=>{
                result+=data;
            })
            response.on('end',()=>{
                result=JSON.parse(result).result.songs.map(song=>{
                    return {
                        id:song.id,
                        name:song.name,
                        picUrl:song.album.picUrl || song.artists.picUrl,
                        audio:song.audio
                    }
                })
                callback(result);
            })
        })
        request.end();
    }
}
module.exports=MusicUtil;