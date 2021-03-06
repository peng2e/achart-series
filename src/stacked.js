/**
 * @fileOverview 处理层叠的数据序列的扩展
 * @ignore
 */

  
var Util = require('achart-util');

/**
 * @class Chart.Series.Stacked
 * @protected
 * 此类是一个扩展，不应该直接实例化,主要用于区域图，柱状图层叠的场景
 *
 *  - <a href="http://spmjs.io/docs/achart-series/latest/api/stacked.html" target="_blank">文档</a>
 *  - <a href="http://spmjs.io/docs/achart-series/latest/wiki/07-stacked.html" target="_blank">wiki</a>
 * 
 */
var Stacked = function(){

};

Stacked.ATTRS = {
  /**
   * 数据序列层叠的类型
   *   - none : 不进行层叠
   *   - normal : 一般的层叠方式，后面的数据序列的y值在前一个数据序列基础上显示
   *   - percent : 按照百分比进行层叠展示
   * @type {String}
   */
  stackType : 'none'
};

Util.augment(Stacked,{
  /**
   * @protected
   * 处理层叠的点
   * @param  {Object} point 处理的点
   * @param  {Number} index 索引
   */
  processStackedPoint : function(point,index){
    var _self = this,   
      pre = _self.getVisiblePrev(),
      xName = _self.getXName(),
      yName = _self.getYName();

    if(pre){
      var prePoint = pre.getPoints()[index],
        baseValue = _self.getBaseValue();
      if(!_self.isInCircle()){ //非雷达图中
        point[yName] = point[yName] + prePoint[yName] - baseValue;
      }else{ //雷达图中
        var xAxis = _self.get('xAxis'),
          r = xAxis.getDistance(point.x,point.y),
          ir = prePoint.r || xAxis.getDistance(prePoint.x,prePoint.y),
          curPoint;

        r = ir + r;
        curPoint = xAxis.getCirclePoint(point.xValue,r)
        point.x = curPoint.x;
        point.y = curPoint.y;
        point.r = r;
        point.ir = ir;
      }
      
      point.lowY = prePoint[yName];
      point.lowX = prePoint[xName];
    }
  },
  /**
   * @protected
   * 获取数据中的比例
   */
  getStackedPercent : function(value,index){
    var _self = this,
      data = _self.get('parent').getStackedData(_self.get('yAxis'),'yAxis'),
      total = data[index];
    if(total){
      return value/total;
    }
    return NaN;
  },  
  /**
   * @protected
   * 转换显示的值，一般用于层叠的数据序列中
   */
  parseYValue : function(value,index){
    var _self = this,
      stackType = _self.get('stackType'),
      data = _self.get('data'),
      index = index == null ? Util.indexOf(data,value) : index,
      percentValue;
    if(stackType == 'percent'){
      percentValue = _self.getStackedPercent(value,index);
      value = percentValue * 100;
    }
    return value;
  },
  /**
   * @protected
   * 获取显示的前一个序列
   */
  getVisiblePrev : function(){
    var _self = this,
      parent = _self.get('parent'),
      yAxis = _self.get('yAxis'),
      children = parent.get('children'),
      pre;

    Util.each(children,function(series,i){
      if(series == _self){
        return false;
      }
      if(series.get('visible') && series.get('yAxis') == yAxis){ //获取前一个显示的数据序列
        pre = series;
      }
    });
    return pre;
  },
  /**
   * 获取提示信息
   * @return {*} 返回显示在上面的文本
   */
  getTipInfo : function(point){
    var _self = this,
      stackType = _self.get('stackType');
    if(stackType == 'percent'){
      var y = point.yValue || 0;
      return [point.value,'（'+y.toFixed(2)+'%）'];
    }
    return point.value;
  },
  /**
   * 是否是层叠的数据序列
   * @return {Boolean} 
   */
  isStacked : function(){
    var _self = this,
      stackType = _self.get('stackType');
    return stackType && stackType !== 'none';
  }

});

module.exports = Stacked;
