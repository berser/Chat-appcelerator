var chat = require('chat');
var nMessages = 0;
var room = 'Lobby'

$.options.on('click', function(e){
	if(e.source.active){
		$.detail.animate({
			duration:200,
			left:'0px'
		});
		e.source.active = false;
	}else{
		$.detail.animate({
			duration:200,
			left:(Ti.Platform.displayCaps.platformWidth-45) + 'px'
		});	
		e.source.active = true;
	}	
});

$.index.on('open', function(){	
	chat.connect({
		joinResult: function(e){			
			$.room.text = "Room: "+ e.room;
			room = e.room;
		},
		nameResult: function(e){			
			alert(e);
		},
		message: function(e){			
			$.conversation_table.appendRow(Alloy.createController('rowMessage',{
				message:e.text,
				me:false
			}).getView());
			$.conversation_table.scrollToIndex(nMessages,{
                animated:true
            });
			nMessages++;						
		},
		disconnect: function(e){
			//alert('disconnect...');
		}
	});
	
	setTimeout(function(){		
	$.message.softKeyboardOnFocus = Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
	},500);	
	
});

$.send.on('singletap', function(e){
	if($.message.value){
		chat.message({
			room:room,
			text: $.message.value
		});				
		
		$.conversation_table.appendRow(Alloy.createController('rowMessage',{
			message:$.message.value,
			me:true
		}).getView());
		
		$.conversation_table.scrollToIndex(nMessages,{
			animated:true
		});
		
		$.message.value = '';
		nMessages++;
	}
});


$.index.open();
