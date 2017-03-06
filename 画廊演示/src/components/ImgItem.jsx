var React = require('react');
var PubSub = require('../pubsub.js');

var ImgList = React.createClass({

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
		var item = this.props.item;
		var styleInfo = this.props.styleInfo;
		var style = styleInfo.pos;

		var isReverse = styleInfo.isReverse;

		console.log(isReverse);
		style.transform = 'rotate('+styleInfo.rotate+'deg)';
		
		var className = 'img-figure';
		if(styleInfo.isCenter){
			className += ' is-center';
		}


		if(isReverse){
			style.transform += ' rotateY(180deg) translateX(-100%)';
			className+= ' is-reverse';
		}
		return (
			<figure className={className} style={style} onClick={this.clickHandle}>
				<img src={item.imgUrl} alt="" />
				<figcaption>
					<h2>{item.title}</h2>
					<p>{item.desc}</p>
				</figcaption>
			</figure>
		);
		
	}
});

module.exports = ImgList;