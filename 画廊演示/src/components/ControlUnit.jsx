var React = require('react');
var PubSub = require('../pubsub.js');


var ControlUnit  = React.createClass({
	clickHandle: function(){
		var isCenter = this.props.styleInfo.isCenter;
		var index = this.props.index;
		if(isCenter){
			PubSub.publish('setReverse', index);
		}
		else{
			
			PubSub.publish('setCenter', index);
		}
	},
	render: function(){
		var styleInfo = this.props.styleInfo;
		var className = '';
		var isReverse = styleInfo.isReverse;
		if(styleInfo.isCenter){
			className = 'is-center';
		}

		if(isReverse){
			className+=' is-reverse';
		}
		return <li className={className} onClick={this.clickHandle}></li>
	}
});

module.exports = ControlUnit;