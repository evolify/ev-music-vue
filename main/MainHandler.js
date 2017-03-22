const ipcMain=require('electron').ipcMain;
const {app,dialog}=require('electron');
const musicUtil=require('./music');
const handler={
	start:()=>{
		ipcMain.on('exit',()=>{
			// dialog.showMessageBox({
			// 	title:'确认',
			// 	type:'question',
			// 	message:'确认退出？',
			// 	buttons:["取消","确认"]
			// },index=>{
			// 	if (index==1) {
			// 		app.quit();
			// 	}
			// });
			app.quit();
		});
		ipcMain.on('query',(event,data)=>{
			musicUtil.query(data.keywords,result=>{
				event.sender.send('query-result',result);
			})
		});
	}
}
module.exports=handler;