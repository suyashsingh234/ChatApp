var socket=io();
socket.on('connect',function(){
		console.log('Server connected');
});
socket.on('disconnect',function(){
		console.log('Server disconnected');
});
socket.on('createmessage',function(message)
{
		$('#chat').append('<li>'+message.user+':'+message.text+'</li>');
});
document.getElementById('inputmessage').addEventListener('keydown',function(event){
	if(event.keyCode===13)
	{
		event.preventDefault();
		document.getElementById('sendbtn').click();
	}
});

$('#sendbtn').click(function(event)
{
	event.preventDefault();
	socket.emit("send-message-to-server",
	{
		user:"user",
		text:$('#inputmessage').val()
	});
});
