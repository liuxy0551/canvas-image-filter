let canvas = null, ctx = null
window.onload = () => {
    initDom()
    initImage()
}

// 滤镜处理
imageFilter = (type) => {
    let img = new Image() // 声明新的Image对象
    img.src = "./img/photo.png"
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imageData.data
    for (let i = 0; i < data.length / 4; i++) {
        let red = data[i * 4],
            green = data[i * 4 + 1],
            blue = data[i * 4 + 2]

        if (type === 'removeColor') {
            let gray = red * 0.3 + green * 0.59 + blue * 0.11
            // 刷新RGB
            data[i * 4] = gray
            data[i * 4 + 1] = gray
            data[i * 4 + 2] = gray
        } else if (type === 'negative') {
            // 刷新RGB
            data[i * 4] = 255 - red
            data[i * 4 + 1] = 255 - green
            data[i * 4 + 2] = 255 - blue
        } else if (type === 'singleColor') {
            // 刷新RGB
            data[i * 4 + 1] = 0
            data[i * 4 + 2] = 0
        } else if (type === 'blackWhite') {
            let gray = red * 0.3 + green * 0.59 + blue * 0.11
            let black = gray > 128 ? 255 : 0
            // 刷新RGB
            data[i * 4] = black
            data[i * 4 + 1] = black
            data[i * 4 + 2] = black
        } else if (type === 'fluorescence') {
            // 刷新RGB
            data[i * 4] = red * 128 / (green + blue + 1)
            data[i * 4 + 1] = green * 128 / (red + blue + 1)
            data[i * 4 + 2] = blue * 128 / (green + red + 1)
        }
    }
    ctx.putImageData(imageData, 0, 0) // 重绘图像
}

initDom = () => {
    const selectDom = document.querySelector('#my-select')
    selectDom.onchange = (e) => {
        const type = e.target.value
        if (type === 'normal') return initImage()
        imageFilter(type)
    }
}

// 初始化图片
initImage = () => {
    document.querySelector('#my-select').value = 'normal'
    let img = new Image() // 声明新的Image对象
    img.src = "./img/photo.png"
    // 图片加载后
    img.onload = () => {
        canvas = document.querySelector("#my-canvas")
        ctx = canvas.getContext("2d")
        // 根据image大小，指定canvas大小
        canvas.width = img.width
        canvas.height = img.height
        // 绘制图像
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
}
