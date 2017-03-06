require('./css/style.css');

var React = require('react');
var ReactDOM = require('react-dom');

var Main = require('./components/Main.jsx');

var data = require('./data/img-data.json');

data.forEach(function(item, i){
	item.imgUrl = require(item.fileName);
});


window.onload = function(){
	ReactDOM.render(
		<Main imgData={data}/>,
		document.getElementById('app')
	)
}