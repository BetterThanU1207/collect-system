Thanks:
ECharts: A Declarative Framework for Rapid Construction of Web-based Visualization
Deqing Li, Honghui Mei, Yi Shen, Shuang Su, Wenli Zhang, Junting Wang, Ming Zu, Wei Chen.
Visual Informatics, 2018 [PDF]

# collect-system
集抄系统
bootstrap + nodejs express + SQL
2018-10-18 16:05
删除example.js、ga.js、/jQueryshow.html/Pagination.html/Format.html/Toolbar.html文件
接下来实现图标选择面板、查询面板的隐藏、解决bootstrap table图标显示异常，以及404页面。
2018-10-25 11:22
修复bootstrap-table 部分图标显示异常（通过修改bootstrap-table 相关的js文件）；实现图标选择面板；通过树形table（treegrid）实现菜单管理页面；实现card的隐藏、显示；所有ajax采用异步并消除带来的错误；实现modal的可拖动、居中显示；
还未实现404页面显示、仪表页面。
2018-10-26 15:52
bower chart.js 但是未使用次组件实现仪表
下载echart.js放在public下，并实现实心饼图。
2018-11-12 14:51
新增功能：饼图、曲线图、柱图、数据集（曲线、饼图共享一个数据源）、仪表盘
新增文件：public下新增echartsdata，bmap.js
文件改动：分离header.html，分离包含的bootstrap table的引用文件，不至于echart额外引用。
2018-11-19 16:15
新增功能：实现两个雷达图，一个多边形一个圆形；实现只显示济宁地图的十二县散点图，带边界线。
将bar链接数据库数据。