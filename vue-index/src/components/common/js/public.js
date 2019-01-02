export function changeTwoDecimal_f (x) {
    var f_x = parseFloat(x)
    if (isNaN(f_x)) {
        // alert('不能输入负数')
        return false
    }
    f_x = Math.round(x * 100) / 100
    var s_x = f_x.toString()
    var pos_decimal = s_x.indexOf('.')
    if (pos_decimal < 0) {
        pos_decimal = s_x.length
        s_x += '.'
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0'
    }
    return s_x
}

CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
    if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
        return
    }

    const context = this
    const canvas = context.canvas

    if (typeof maxWidth == 'undefined') {
        maxWidth = (canvas && canvas.width) || 300
    }
    if (typeof lineHeight == 'undefined') {
        lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight)
    }

    // 字符分隔为数组
    const arrText = text.split('')
    let line = ''

    for (let n = 0; n < arrText.length; n++) {
        const testLine = line + arrText[n]
        const metrics = context.measureText(testLine)
        const testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y)
            line = arrText[n]
            y += lineHeight
        } else {
            line = testLine
        }
    }
    context.fillText(line, x, y)
}
