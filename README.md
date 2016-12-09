# Echarts-export 1.0.1

基於[ECharts2](http://echarts.baidu.com/echarts2/)做的圖表自動生成工具，選擇json文件和圖表類型，即可生成圖表。本工具附帶有excel轉換成json的工具。本地運行即可，但為了讀取數據文件，需在本地運行服務器，工具自帶運行方法。

`$().drawChart(option)` 接收一切ECharts2的合法參數，如有需要，可參考Echarts2的文檔。

## 更新日誌

1. 修復不選擇樣式風格無法生成圖表bug；
2. 頁面優化；

## 圖表類型

目前僅支持下列類型，更多類型擴展中。

- 樹形圖
- 字符雲
- 餅圖

## 使用

### 安裝

使用本工具前需先安裝 `node.js` 和 `packjson`文件。

```js
npm install --save-dev
```

### 運行

執行以下命令即可運行工具。

```js
gulp
```

在自動打開的窗口中選擇數據文件（json格式），選擇圖表類型，再點擊生成按鈕即可。json文件可通過excel文件轉換，轉換命令參看gulp說明。

### API

目前僅開放一個接口。ECharts的實例方法還未可使用，以後會實現。

#### 自定義樣式

若需自定義樣式，可通過 `$.charts.addStyle(style)` 方法擴展

返回的對象為ECharts的 `itemStyle` 接收的參數，可參考官方文檔。例：

```
$.charts.addStyle({
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
});
```

添加後還需在 `select#styleName` 中添加option，value同樣式名。

```
<option value="wairoStyle">和色</option>
```

## gulp

本插件必須運行gulp才可使用。

可用的 `gulp` 命令如下：

* `gulp` 運行服務器并編譯所有代碼
* `gulp browser-sync` 運行服務器
* `gulp watch` 進入watch模式
* `gulp sass-to-css` 將sass編譯成css
* `gulp minify-css` 壓縮css
* `gulp jscompress` 壓縮js
* `gulp tojson` 將excel文件轉換成json格式


## 分支說明

* `build` 開發分支
* `build/excel` 存放需轉換的excel文件
* `dist` 包含全部編譯後代碼的分支
* `json` 輸出json文件的分支
* `vendor` 其他插件分支


## 已知BUG

運行excel時執行 `gulp tojson` 會報錯。若在 `gulp` 狀態下用excel修改文件，將報錯並退出。尚未知是否為Mac版only的bug。

## 聯繫與討論

QQ：3088680950

如果發現八阿哥了或者有功能上的建議，推薦通過 `issue` 發起討論。


## License

[MIT license](https://opensource.org/licenses/MIT). 有好的想法歡迎提供。
