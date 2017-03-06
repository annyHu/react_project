var React = require('react');
var ImgItem = require('./ImgItem.jsx');
var ImgList = React.createClass({
	render: function(){
		var imgData = this.props.imgData;
		var styleList = this.props.styleList;
		return (
			<section className="img-list">
				{
					imgData.map(function(item, i){
						return <ImgItem 
									key={i}
									item={item} 
									styleInfo={styleList[i] }
									index={i}></ImgItem>;
					})
				}
			</section>
		);
		
	}
});

module.exports = ImgList;