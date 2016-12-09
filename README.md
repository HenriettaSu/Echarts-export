# Echarts-export 1.0.0

基於[ECharts2](http://echarts.baidu.com/echarts2/)做的圖表自動生成工具，選擇json文件和圖表類型，即可生成圖表。本插件附帶有excel轉換成json的工具。

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


## 聯繫與討論

QQ：3088680950

如果發現八阿哥了或者有功能上的建議，推薦通過 `issue` 發起討論。


## License

[MIT license](https://opensource.org/licenses/MIT). 有好的想法歡迎提供。
