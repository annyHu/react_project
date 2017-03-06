var React = require('react');
var ImgList = require('./ImgList.jsx');
var ControlNav = require('./ControlNav.jsx');
var PubSub = require('../pubsub.js');

function getRandom(lower, higher){
	return parseInt( Math.random()*(higher-lower) ) + lower;
}

var Main = React.createClass({

	getInitialState: function(){
		var imgLength = this.props.imgData.length;
		var styleList = [];
		for(var i=1;i<=imgLength;i++){
			styleList.push({
				//位置信息
				pos: {
					top: 0,
					left: 0
				},
				// 旋转角度
				rotate: 30,
				//是否是中心图片
				isCenter: false,
				isReverse: false
			});
		}
		return {
			styleList: styleList,
		}
	},
	//位置取值范围
	posRange: {
		//中心点的位置
		centerPoint: {
			top: 0,
			left: 0
		},
		//左边的位置取值范围
		leftSide: {
			//top取值范围数组 top[0]表示小值， top[1]表示大值
			top: [0, 0],
			left: [0, 0]
		},
		//右边的位置取值范围
		rightSide: {
			top: [0, 0],
			left: [0, 0]
		},
		topSide: {
			top: [0, 0],
			left: 0
		}

	},
	//componentDidMount回调函数，组件挂载完成之后触发, 可以在这个函数里获取到真实的dom
	componentDidMount: function(){
		var self = this;
		PubSub.subscribe('setCenter', function(evName, index){
			self.computePos(index);
		});

		PubSub.subscribe('setReverse', function(evName, index){
			console.log(index);
			self.reverse(index);
		});

		//图片的高宽
		var imgItemW = 280;
		var imgItemH = 323;

		//舞台dom节点
		var stageDom = this.refs.stage;

		//舞台的高宽
		var stageW = stageDom.offsetWidth;
		var stageH = stageDom.offsetHeight;


		this.posRange.centerPoint = {
			top: stageH/2-imgItemH/2,
			left: stageW/2-imgItemW/2
		}

		this.posRange.leftSide = {
			top: [
				-imgItemH/2,
				stageH - imgItemH/2
			],
			left: [
				-imgItemW/2,
				stageW/2 - 3*imgItemW/2
			]
		},
		this.posRange.rightSide = {
			top: [
				-imgItemH/2,
				stageH - imgItemH/2
			],
			left: [
				stageW/2+imgItemW/2,
				stageW - imgItemW/2
			]
		},

		this.posRange.topSide = {
			top: [
				-imgItemH/2,
				stageH/2 - 3*imgItemH/2
			],
			left: stageW/2-imgItemW/2
		}

		this.computePos(0);
	},

	//翻转图片
	reverse: function(centerIndex){
		var styleList = this.state.styleList;
		var centerItem = styleList.splice(centerIndex, 1)[0];

		centerItem.isReverse = !centerItem.isReverse;
		styleList.forEach(function(item, i){
			item.isReverse = false;
		});

		styleList.splice(centerIndex, 0,centerItem);

		console.log(styleList);
		this.setState({
			styleList: styleList
		})
	},
	//计算图片位置信息和旋转角度
	//centerIndex中心图片的索引
	computePos: function(centerIndex){
		var posRange = this.posRange;
		var styleList = this.state.styleList;
		var centerItem = styleList.splice(centerIndex, 1);

		centerItem.pos = posRange.centerPoint;
		centerItem.rotate = 0;
		centerItem.isCenter = true;
		//上边图片索引
		var topIndex =  getRandom(0, styleList.length-1);
		var topItem = styleList.splice(topIndex, 1);

		topItem.pos = {
			top:  getRandom(posRange.topSide.top[0], posRange.topSide.top[1]),
			left: posRange.topSide.left,
		};

		styleList.forEach(function(styleItem, i){
			if(i<=styleList.length/2){//放左边
				styleItem.pos={
					top: getRandom(posRange.leftSide.top[0], posRange.leftSide.top[1]),
					left: getRandom(posRange.leftSide.left[0], posRange.leftSide.left[1])
				}
			}
			else{//放右边
				styleItem.pos={
					top: getRandom(posRange.rightSide.top[0], posRange.rightSide.top[1]),
					left: getRandom(posRange.rightSide.left[0], posRange.rightSide.left[1])
				}
			}
		});


		styleList.splice(topIndex, 0, topItem);

		styleList.forEach(function(item, i){
			item.rotate = getRandom(-30, 30);
			item.isCenter = false;
		});

		styleList.splice(centerIndex, 0, centerItem);
		styleList.forEach(function(item){
			item.isReverse = false;
		});
		this.setState({
			styleList: styleList
		})

	},
	render: function(){
		return (
			<section className="stage" ref="stage">
				<ImgList 
					imgData={ this.props.imgData}
					styleList={this.state.styleList}>
				</ImgList>
				<ControlNav styleList={this.state.styleList}></ControlNav>
			</section>
		);
	}
});

module.exports = Main;