/**
 * 从文件中读取文本，计算文本中每个字母出现的频率，
 * 然后按照频率降序显示一个柱形图
 */
// 这个类扩展Map，实现get()方法在key不处于映射中时返回指定值而不是null
class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }
    get(key) {
        if (this.has(key)) {
            return super.get(key);
        }
        else {
            return this.defaultValue;
        }
    }
}
// 这个类计算并显示字母的柱形图
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0);   // 字母到数量的映射
        this.totalLetters = 0;                    // 所有字母的数量
    }
    // 这个方法用文本中的字母更新柱状图
    add(text) {
        text = text.replace(/\s/g, "").toUpperCase();   // 移除文本中的空白，然后将字母转为大写
        for (let character of text) {
            let count = this.letterCounts.get(character);
            this.letterCounts.set(character, count + 1);
            this.totalLetters++;
        }
    }

    // 将柱形图转为字符串并显示ASCII图形
    toString() {
        let entries = [...this.letterCounts]; // 把映射转为一个[key, value]数组的数组
        // 按数量和字母表对数组排序
        entries.sort((a, b) => {
            // 如果数量一样多，就比较字母顺序
            if (a[1] == b[1]) {
                return a[0] < b[0] ? -1 : 1;
            }
            // 数量不一样多，直接比较数量大小
            else {
                return b[1] - a[1];
            }
        })
        // 数量转为百分比
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }
        // 删除小于1%的条目
        entries = entries.filter(e => e[1] >= 1);

        // 把每个条目转成一行文本
        let lines = entries.map(
            ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
        )
        // 返回所有行拼接的结果
        return lines.join("\n");
    }
}

// 这个异步函数，创建一个Histogram对象
// 从标准输入异步读取文本块，然后把这些块添加到柱形图
// 在读取到流的末尾后，返回柱形图
async function histogramFromStdin() {
    process.stdin.setEncoding("utf8");  // 读取unicode字符串，而不是字节
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}

histogramFromStdin().then(histogram => { console.log(histogram.toString()) });