var React = require('react');

var ControlUnit  = require('./ControlUnit.jsx');

var ControlNav = React.createClass({
	render: function(){
		var styleList = this.props.styleList;
		return (
			<nav className="control-nav">
				<ul>
					{
						styleList.map(function(item, i){
							return <ControlUnit key={i} styleInfo={item} index={i}></ControlUnit>
						})
					}
				</ul>
			</nav>
		);
		
	}
});

module.exports = ControlNav;