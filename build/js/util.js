require.config({
        paths: {
            echarts: '../vendor/echarts/'
        }
});

$.fn.drawChart = function (option) {
    var ele = $(this);
    charts = new $.charts(ele, option);
    return charts;
}

$.charts = function (ele, option) {
    var styleOption = $.extend({styles: $.charts.defaultStyles}, option),
        style = this.getStyle(styleOption),
        initOption = $.extend({style: style}, option);
    this.selector = ele;
    this.init(ele, initOption);
}

$.extend($.charts, {
    defaults: {
        tree: {
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series: [
                {
                    name:'树图',
                    type:'tree',
                    orient: 'horizontal',
                    rootLocation: {x: 50, y: '50%'},
                    nodePadding: 25,
                    layerPadding: 100,
                    hoverable: false,
                    roam: true,
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            color: '#4883b4',
                            label: {
                                show: true,
                                position: 'right',
                                formatter: "{b}",
                                textStyle: {
                                    color: '#000',
                                    fontSize: 5
                                }
                            },
                            lineStyle: {
                                color: '#ccc',
                                type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                            }
                        },
                        emphasis: {
                            color: '#4883b4',
                            label: {
                                show: false
                            },
                            borderWidth: 0
                        }
                    },
                    data: []
                }
            ]
        },
        pie: {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient : 'vertical',
                x : 'left',
                data: []
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: false, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series : [
                {
                    name: '餅圖',
                    type: 'pie',
                    radius : '55%',
                    itemStyle : {
                        normal : {
                            label : {
                                position : 'outer',
                                formatter : function (params){
                                    if(params.percent){
                                        return params.name + params.percent+ '%\n'
                                    }
                                    return params.name + params.value
                                }
                            }
                        }
                    },
                    data: []
                }
            ]
        },
        wordCloud: {
            tooltip: {
                show: true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            series: [{
                name: '字符雲',
                type: 'wordCloud',
                size: ['80%', '80%'],
                textRotation : [0, 45, 90, -45],
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 14
                },
                data: []
            }]
        }
    },
    prototype: {
        getStyle: function (option) {
            var styles = option.styles,
                style,
                customStyle = option.customStyle,
                i;
            for (i in styles) {
                if (i === customStyle) {
                    style = styles[i];
                }
            }
            return style;
        },
        init: function (ele, initOption) {
            var $this = $(this),
                id = ele.attr('id'),
                option = initOption,
                type = option.type;
            switch (type) {
                case 'tree':
                    $.charts.prototype.drawTree(id, option);
                    break;
                case 'pie':
                    $.charts.prototype.drawPie(id, option);
                    break;
                case 'wordCloud':
                    $.charts.prototype.drawWordCloud(id, option);
                    break;
            }
        },
        drawTree: function (id, option) {
            var opt = option;
            opt = $.extend($.charts.defaults.tree, opt || {});
            require(['echarts', 'echarts/chart/tree'], function (ec) {
                var myChart = ec.init(document.getElementById(id), 'macarons');
                opt.series[0].data = opt.seriesData;
                myChart.setOption(opt);
                if (opt.theme) {
                    myChart.setTheme(opt.theme);
                }
            });
        },
        drawWordCloud: function (id, option) {
            var opt = option
            opt = $.extend($.charts.defaults.wordCloud, opt || {});
            require(['echarts', 'echarts/chart/wordCloud'], function (ec) {
                var myChart = ec.init(document.getElementById(id), 'macarons'),
                    i,
                    g;
                for (i = 0; i < opt.seriesData.length; i++) {
                    g = opt.seriesData[i];
                    g.itemStyle = opt.style();
                }
                opt.series[0].data = opt.seriesData;
                myChart.setOption(opt);
                if (opt.theme) {
                    myChart.setTheme(opt.theme);
                }
            });
        },
        drawPie: function (id, option) {
            var opt = option;
            opt = $.extend($.charts.defaults.pie, opt || {});
            require(['echarts', 'echarts/chart/pie', 'echarts/chart/funnel'], function (ec) {
                var myChart = ec.init(document.getElementById(id), 'macarons'),
                    i,
                    g;
                for (i = 0; i < opt.seriesData.length; i++) {
                    g = opt.seriesData[i];
                    g.itemStyle = opt.style();
                }
                opt.series[0].data = opt.seriesData;
                myChart.setOption(opt);
                if (opt.theme) {
                    myChart.setTheme(opt.theme);
                }
            });
        }
    },
    defaultStyles: {
        darkStyle: function () {
            return {
                normal: {
                    color: 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')'
                }
            };
        },
        rainbowStyle: function () {
            return {
                normal: {
                    color: function(params) {
                        var colorList = [
                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                        ];
                        return colorList[params.dataIndex]
                    },
                    textStyle: {
                        fontFamily: 'Microsoft Yahei, Arial, Verdana, sans-serif'
                    }
                }
            }
        },
        wairoStyle: function () {
            return {
                normal: {
                    color: function(params) {
                        var colorList = [
                          '#89C3EB','#83F6E8','#838BF6','#71C6D4','#7192D4',
                           '#AEDEFF','#9E773D','#EBC389','#4D7D9E','#7AAED1',
                           '#3F596B','#90CEF8'
                        ];
                        return colorList[params.dataIndex]
                    },
                    textStyle: {
                        fontFamily: 'Microsoft Yahei, Arial, Verdana, sans-serif'
                    }
                }
            }
        }
    },
    addStyle: function (style) {
        $.extend($.charts.defaultStyles, style);
    }
});
