# Echarts-export 2.0.0

基於[ECharts2](http://echarts.baidu.com/echarts2/)做的圖表自動生成工具，導入excel文件或json數據，選擇圖表類型，即可生成圖表。本地運行即可。

`$().drawChart(option)` 接收一切ECharts2的合法參數，自定義傳入參數將覆蓋默認配置參數。如有需要，可參考Echarts2的文檔。

## 更新日誌

1. 可直接選擇excel文件，不再需要自己將excel文件轉換成json了；
2. 也不再需要運行服務器，所有生成操作可在本地直接執行；
3. 原本的 `gulp-sheets2json` 將不再使用，但會保留在代碼中，如需使用，請到 `package.json` 和 `gulpfile.js` 中將相關的註釋代碼取消註釋；
4. 除選擇文件方式，增加輸入json數據方式；

## 圖表類型

目前僅支持下列類型，更多類型擴展中。

- 樹形圖
- 字符雲
- 餅圖

## 使用

### 安裝

如需對本工具進行深度拓展修改，需先安裝 `node.js` 和 `package.json`文件。

```js
npm install --save-dev
```

### 運行

修改並編譯css或js文件，執行以下命令即可運行工具。

```js
gulp
```

### 使用

導入數據文件（選擇excel文件或在文本區域輸入json），選擇圖表類型，再點擊生成按鈕即可。

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
* `gulp tojson` 將excel文件轉換成json文件，默認不安裝此工具，如需使用，請到`package.json` 和 `gulpfile.js` 開啟


## 分支說明

* `build` 開發分支
* `build/excel` excel文件事例分支。如使用 `gulp tojson` 轉換方法，待轉換的excel文件存放於此
* `dist` 包含全部編譯後代碼的分支
* `json` 輸出json文件的分支，供 `gulp tojson` 轉換方法使用
* `vendor` 其他插件分支


## 已知BUG

運行excel時執行 `gulp tojson` 會報錯。若在 `gulp` 狀態下用excel修改文件，將報錯並退出。尚未知是否為Mac版only的bug。

現不再建議使用此方法，暫不修復。

## 聯繫與討論

QQ：3088680950

如果發現八阿哥了或者有功能上的建議，推薦通過 `issue` 發起討論。


## License

[MIT license](https://opensource.org/licenses/MIT). 有好的想法歡迎提供。
