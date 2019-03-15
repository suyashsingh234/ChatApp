const path=require('path');
const http=require('http');
const express=require('express');
var app=express();

var port=process.env.PORT || 3000;
const socketio=require('socket.io');
var server=http.Server(app);
var io=socketio(server);

server.listen(port,function(){
		console.log("Server running on port "+port);
});

const publicpath=path.join(__dirname,'../public');
app.use(express.static(publicpath));

app.get('/',function(request,response){
		response.sendFile(path.join(publicpath,"index.html"));
});

io.on('connection',function(socket){
		console.log("User connected");
		socket.on('disconnect',function(){
				console.log("User disconnected");
		});
		socket.on('send-message-to-server',function(message)
		{
			io.emit('createmessage',message);
		});
});
