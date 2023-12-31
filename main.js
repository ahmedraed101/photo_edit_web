let saturate = document.querySelector('#saturate')
let contrast = document.querySelector('#contrast')
let brightness = document.querySelector('#brightness')
let sepia = document.querySelector('#sepia')
let grayscale = document.querySelector('#grayscale')
let blur = document.querySelector('#blur')
let hueRotate = document.querySelector('#hue-rotate')

let upload = document.querySelector('#upload')
let download = document.querySelector('#download')
let img = document.querySelector('#img')

let reset = document.querySelector('span')
let imgBox = document.querySelector('.img-box')

const cnavas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const resetValue = () => {
    saturate.value = 100
    contrast.value = 100
    brightness.value = 100
    sepia.value = 0
    grayscale.value = 0
    blur.value = 0
    hueRotate.value = 0
    ctx.filter = 'none'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

window.addEventListener('load', () => {
    download.style.display = 'none'
    reset.style.display = 'none'
    imgBox.style.display = 'none'
})

upload.addEventListener('change', (e) => {
    resetValue()
    download.style.display = 'block'
    reset.style.display = 'block'
    imgBox.style.display = 'block'
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = () => {
        img.src = file.result
    }
    img.addEventListener('load', () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        img.style.display = 'none'
    })
})

let filters = document.querySelectorAll('ul li input')
console.log(filters)
filters.forEach((filter) => {
    filter.addEventListener('input', (e) => {
        ctx.filter = `
  saturate(${saturate.value}%)
  contrast(${contrast.value}%)
  brightness(${brightness.value}%)
  sepia(${sepia.value}%)
  grayscale(${grayscale.value})
  blur(${blur.value}px)
  hue-rotate(${hueRotate.value}deg)
`
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    })
})

reset.addEventListener('click', resetValue)

download.addEventListener('click', () => {
    download.href = canvas.toDataURL('image/jpeg')
})
