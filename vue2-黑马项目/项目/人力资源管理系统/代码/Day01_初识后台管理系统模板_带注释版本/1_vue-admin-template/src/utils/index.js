
/**
 * 格式化日期
 * @param {(Object|string|number)} time(时间对象|时间字符串|时间戳)
 * @param {string} cFormat (格式模板yyyy-mm-dd或者mm-dd)
 * @returns {string | null} 返回处理后日期字符串
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) { // 如果没有传参, time传入为null或undefined, 直接返回null
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}' // 格式化目标
  let date
  if (typeof time === 'object') {
    date = time // 如果外面传入的是日期对象
  } else {
    if ((typeof time === 'string')) { // 如果外面传入的是日期字符串
      if ((/^[0-9]+$/.test(time))) { // 如果是数字(时间戳)
        // support "1548221490638"
        time = parseInt(time) // 把时间戳字符串, 转成数字类型
      } else { // safari浏览器里不支持年-月-日格式, 支持年/月/日, 要转换下
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000 // 如果传入的是数字, 但是是10位(秒), 要转成毫秒
    }
    date = new Date(time) // 把时间戳最终也转成日期对象
  }
  // ***********战术分割线---上面为了得到日期对象*******************
  const formatObj = { // 把日期对象转成年,月,日,时,分,秒,天数字装入对象
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  // 把外面传入的格式例如yyyy-mm-dd, 替换成数字2021-12-02类似年月日
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key] // 把英文对应取出数字
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] } // 如果key要的是日, 则用数字去数组换出中文
    return value.toString().padStart(2, '0') // padStart(总位数, 前置补充), 所以如果只不足2位, 左边补0
  })
  return time_str // 返回处理后的年月日数字的字符串
}

/** 返回多久之前, 超过2天返回年月日时分秒
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) { // 如果是秒, 转成毫秒的时间戳
    time = parseInt(time) * 1000
  } else { // 如果是日期对象, 转成时间戳
    time = +time
  }
  const d = new Date(time) // 再把时间戳转成日期对象
  const now = Date.now() // 获取

  const diff = (now - d) / 1000 // 求出时间戳, 差值秒

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) { // 小于1天的 就是多少小时前
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) { // 小于2天的就是1天前
    return '1天前'
  }
  if (option) { // option传递了的话意思就是要格式化时间
    return parseTime(time, option) // 调用上面方法
  } else { // 如果没有第二个参数, 超过2天了返回x月x日x时x分
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 把key=value&key=value字符串转成{key: value, key: value}
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  // 例如: ?a=10&b=20
  // 把?后面的参数截取出来, URL转码把%E2等字符转成中文
  // 如果?后面的参数有+号替换成空字符串
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) { // 如果没有参数, 直接返回空对象
    return {}
  }
  const obj = {}
  const searchArr = search.split('&') // 用&符号分割参数, 类似:['a=10', 'b=20']
  searchArr.forEach(v => { // 遍历每个数组元素
    const index = v.indexOf('=') // 查找小字符串里有无=字符
    if (index !== -1) { // 如果找到了, 从头截取到=号左边
      const name = v.substring(0, index) // 作为名字
      const val = v.substring(index + 1, v.length) // 后面value截取
      obj[name] = val // 往对象里添加一对key: value
    }
  })
  return obj // 上面处理后返回对象
}
