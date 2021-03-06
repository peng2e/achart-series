# 简介

---

图表序列的简介

---


## 目录

  * 为什么提供
  * 实现了什么
  * 如何使用

### 为什么

  * 在项目中有很多图表类型，折线图、柱状图、饼图等等，这些图表有相同的地方也有不同的地方。将每种图表类型实现成一个类的过程中，我们可以将共性的东西抽取成扩展，将不同的地方在各个类中特殊实现。
  * 所有类型的图表都是将数据转换成对应的图形，并响应鼠标事件，改变数据时图表随着改变。
  * 有些图表类型需要坐标轴的支持，通过坐标轴将数据转换成画布上的图形，所以通过数据自动生成坐标轴的功能也是必须的。

### 实现了什么

  * 图表序列将数据转换成画布上的图形
  * 图表序列显示数据的标示(marker)和文本(label)
  * 并对鼠标等事件作出响应,如mouseover,mouseout,mousemove等事件
  * 改变数据时重新绘制对应的图形
  * 初始绘制和改变过程中的动画

### 如何使用

  * 图表序列的配置项比较繁琐，特别是使用了坐标轴的序列类型，所以在后面的模块里对图表序列的使用做了封装，也可以直接使用皮肤，减少繁琐的配置项
  * 本章的demo中仅仅为了说明如何创建图表序列和图表序列的功能

### 更多

  * [基础图表序列](1-base.md)
  * [笛卡尔积序列](2-cartesian.md)
  * [折线图](3-line.md)
  * [区域图](4-area.md)
  * [柱状图](5-column.md)
  * [饼图](6-pie.md)
  * [序列层叠](7-stacked.md)
  * [序列子项](8-itemgroup.md)
  * [雷达图](9-radar.md)
  * [实现自己的序列图](10-custom.md)
  