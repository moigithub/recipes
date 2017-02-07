var express = require('express');
var app = express();

console.log(__dirname);
app.use(express.static(__dirname+'/src'));

app.listen(3000, function(){
	console.log('listening.... on :3000')
})