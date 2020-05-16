var express = require('express');
var socket= require('socket.io');

var app = express();

var server=app.listen(3000,function(){
    console.log('started at 3000');
});

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

var io = socket(server);

io.on('connection',function(socket){
    console.log('connected',socket.id);
    socket.on('username',function(username){
        socket.username=username;
        io.emit('is_online','🔵<i> '+socket.username+' join the chat..</i>');
    
    })
    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })
    
    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});