function scrollToBottom()
{
	var w = $(window), d = $(document);
	//console.log(w.scrollTop() + w.height());
	//console.log(d.height()-$('#chat').children('li:last-child').height());
	if(w.scrollTop() + w.height() >= d.height()-$('#chat').children('li:last-child').height()-1)
   {
      	location.href="#inputmessage";
   }
}

var socket=io();
socket.on('connect',function(){
		console.log('Server connected');
});
socket.on('disconnect',function(){
		console.log('Server disconnected');
});
socket.on('createmessage',function(message)
{
		//scrollToBottom();
		$('#chat').append(Mustache.render($('#newMessage').html(),{
			user:message.user,
			content:message.text,
			//timeFromNow:moment().fromNow()
		}));
		scrollToBottom();
		$('#inputmessage').val('');
});
socket.on('createlocationlink',function(message)
{
	$('#chat').append(Mustache.render($('#locationMessage').html(),{
		user:message.user,
		locationCoords:message.text
	}));
	scrollToBottom();
	$('#sendlocation').removeAttr('disabled').html('Send location');
});
document.getElementById('inputmessage').addEventListener('keydown',function(event){
	if(event.keyCode===13) //enter key
	{
		event.preventDefault();
		document.getElementById('sendbtn').click();
	}
});

$('#sendlocation').click(function(event){
		event.preventDefault();
		if(!navigator.geolocation)
		{
			return alert('Geo location not supported by your browser');
		}
		navigator.geolocation.getCurrentPosition(function(position)
		{
				$('#sendlocation').attr('disabled','disabled').html('Sending...');
				var message=
				{
					user:"user",
					text:position.coords.latitude+','+position.coords.longitude
				}
				socket.emit("locationdata",message);
		},function()
		{
			alert("Could not get your location!!");
		});
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
