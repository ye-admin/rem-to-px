//引入文件模块
const fs = require("fs");
const readline = require('readline-sync');

const filePath = readline.question("输入文件路径:");
const Proportion = readline.question("输入转换比例:");
//创建可读流
const rs = fs.createReadStream(filePath)
//创建可写流
const ws = fs.createWriteStream("index.css")
//设置文件编码
rs.setEncoding("utf8")
//匹配rem
const remRa = /\d+(\.\d+)?rem/g
rs.on("data", function (chunk) {
    console.log('开始转换');
    const str = chunk
    //rem改为px
    ws.write(str.replace(/\d+(\.\d+)?rem/g, function (match) {
        return match.slice(0, match.length - 3) * Proportion + "px"
    }))
})
rs.on("end", function () {
    ws.end() //文件读取完毕，结束写入。
    console.log('转换完成');
})