import resize, { DIRECTIONS } from './resize'

const _options = {
  color: 'red',
  width: '200px',
  height: '300px'
}

class Component extends HTMLElement {
  constructor(options) {
    super()
    
    this.options = Object.assign({}, _options, options)
    
    this.setComponent()
    this.resize()
    this.setComponentStyle()
    // this.initResizeEvent()
  }
  setComponent() {
    this.shadow = this.attachShadow({ mode: 'open' })
    this.$elm = document.createElement('div')
    this.host = this.shadow.host
    this.$style = document.createElement('style')
    this.shadow.appendChild(this.$style)
    this.shadow.appendChild(this.$elm)
  }
  setComponentStyle() {
    const { width, height, color } = this.options
    this.$elm.style = `width: ${width}; height: ${height}; background: ${color}; top: 100px; left: 500px; position: absolute;`
  }
  resize() {
    this.$after = document.createElement('div')
    this.$afterTop = document.createElement('div')
    this.$afterTopRight = document.createElement('div')
    this.$afterTopLeft = document.createElement('div')
    this.$afterRight = document.createElement('div')
    this.$afterBottomRight = document.createElement('div')
    this.$afterBottom = document.createElement('div')
    this.$afterBottomLeft = document.createElement('div')
    this.$afterLeft = document.createElement('div')
    const commonStyle = 'position: absolute; width: 20px; height: 20px; border-radius: 50%; transform: translate(-50%, -50%); background: blue; cursor: pointer;'
    this.$after.style = 'content: ""; display: block; top: 0; left: 0; position: absolute; width: 100%; height: 100%; border: 3px solid #3899ec;'
    this.$afterTop.style = `top: 0; left: 50%; ${commonStyle}`
    this.$afterTopRight.style = `top: 0; left: 100%; ${commonStyle}`
    this.$afterTopLeft.style = `top: 0; left: 0; ${commonStyle}`
    this.$afterRight.style = `top: 50%; left: 100%; ${commonStyle}`
    this.$afterBottomRight.style = `top: 100%; left: 100%; ${commonStyle}`
    this.$afterBottom.style = `top: 100%; left: 50%; ${commonStyle}`
    this.$afterBottomLeft.style = `top: 100%; left: 0; ${commonStyle}`
    this.$afterLeft.style = `top: 50%; left: 0; ${commonStyle}`
    
    resize(this.$afterTop, this.$elm, DIRECTIONS.TOP)
    resize(this.$afterTopRight, this.$elm, DIRECTIONS.TOPRIGHT)
    resize(this.$afterTopLeft, this.$elm, DIRECTIONS.TOPLEFT)
    resize(this.$afterRight, this.$elm, DIRECTIONS.RIGHT)
    resize(this.$afterBottomRight, this.$elm, DIRECTIONS.BOTTOMRIGHT)
    resize(this.$afterBottom, this.$elm, DIRECTIONS.BOTTOM)
    resize(this.$afterBottomLeft, this.$elm, DIRECTIONS.BOTTOMLEFT)
    resize(this.$afterLeft, this.$elm, DIRECTIONS.LEFT)
    window.addEventListener('click', e => {
      if (e.path.indexOf(this.$elm) === -1) {
        this.$elm.contains(this.$after) && this.$elm.removeChild(this.$after)
        this.$elm.contains(this.$afterTop) && this.$elm.removeChild(this.$afterTop)
        this.$elm.contains(this.$afterTopRight) && this.$elm.removeChild(this.$afterTopRight)
        this.$elm.contains(this.$afterTopLeft) && this.$elm.removeChild(this.$afterTopLeft)
        this.$elm.contains(this.$afterRight) && this.$elm.removeChild(this.$afterRight)
        this.$elm.contains(this.$afterBottomRight) && this.$elm.removeChild(this.$afterBottomRight)
        this.$elm.contains(this.$afterBottom) && this.$elm.removeChild(this.$afterBottom)
        this.$elm.contains(this.$afterBottomLeft) && this.$elm.removeChild(this.$afterBottomLeft)
        this.$elm.contains(this.$afterLeft) && this.$elm.removeChild(this.$afterLeft)
      } else {
        this.$elm.appendChild(this.$after)
        this.$elm.appendChild(this.$afterTop)
        this.$elm.appendChild(this.$afterTopRight)
        this.$elm.appendChild(this.$afterTopLeft)
        this.$elm.appendChild(this.$afterRight)
        this.$elm.appendChild(this.$afterBottomRight)
        this.$elm.appendChild(this.$afterBottom)
        this.$elm.appendChild(this.$afterBottomLeft)
        this.$elm.appendChild(this.$afterLeft)
      }
    })
  }
  resizeEvent($elm, $target) {
    let clicked = false
    let client = {
      clientX: 0,
      clientY: 0
    }
    $elm.addEventListener('mousedown', (e) => {
      e.stopPropagation()
      e.preventDefault()
      clicked = true
      client = {
        clientX: e.clientX, 
        clientY: e.clientY
      }
    }, true)
    window.addEventListener('mouseup', (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (clicked) {
        clicked = false
        // console.log(`x: ${e.clientX - client.clientX}`)
        // console.log(`y: ${e.clientY - client.clientY}`)
        // $target.style.width = parseInt($target.style.width) + Number(e.clientX) - Number(client.clientX) + 'px'
        $target.style.height = parseInt($target.style.height) + Number(client.clientY) - Number(e.clientY) + 'px'
        $target.style.top = parseInt($target.style.top) - (Number(client.clientY) - Number(e.clientY)) + 'px'
      }
      // console.log(clicked)
    }, true)

  }
  // initResize($elm, $target) {
  //   $elm.addEventListener('dragstart', (e) => {
  //     this.previous = {
  //       clientX: e.clientX,
  //       clientY: e.clientY
  //     }
  //     setCloneImage(e)
  //   })
  //   $elm.addEventListener('dragover', (e) => e.preventDefault())
  //   $elm.addEventListener('drag', (e) => {
  //     // console.log(Number(e.clientX) - Number(this.previous.clientX))
  //     console.log(Number($target.style.width) + Number(e.clientX) - Number(this.previous.clientX) + 'px')
  //     // $target.style.width = Number($target.style.width) + e.clientX - this.previous.clientX + 'px'
  //     // this.targetElement.style.width = `${this.targetElement.offsetWidth + (e.clientX - this.previousElement.clientX)}px`
  //     // this.targetElement.style.height = `${this.targetElement.offsetHeight + (e.clientY - this.previousElement.clientY)}px`
  //     // this.previousElement.clientX = e.clientX
  //     // this.previousElement.clientY = e.clientY
  //   })
  //   $elm.addEventListener('drop', (e) => this.previous = {})

  //   // console.log(Number(e.clientX) - Number(this.previous.clientX))
  //   //   this.$elm.style.width = `calc(${this.$elm.style.width} + ${Number(e.clientX) - Number(this.previous.clientX)})`
  // }
  initResizeEvent() {
    // this.$elm.setAttribute('draggable', true)
    this.$elm.addEventListener('dragstart', (e) => {
      setCloneImage(e)
      this.targetElement = e.target
      this.previousElement = {
        clientX: e.clientX,
        clientY: e.clientY
      }
    })
    this.$elm.addEventListener('dragover', (e) => e.preventDefault())
    this.$elm.addEventListener('drag', (e) => {
      this.targetElement.style.width = `${this.targetElement.offsetWidth + (e.clientX - this.previousElement.clientX)}px`
      this.targetElement.style.height = `${this.targetElement.offsetHeight + (e.clientY - this.previousElement.clientY)}px`
      this.previousElement.clientX = e.clientX
      this.previousElement.clientY = e.clientY
    })
    this.$elm.addEventListener('drop', (e) => this.targetElement = null)
  }
}
let img = new Image();
img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const setCloneImage = e => e.dataTransfer.setDragImage(img, 0, 0);

window.customElements.define('app-drawer', Component)
const AppDrawer = customElements.get('app-drawer');
const yellow = new AppDrawer({ color: 'yellow' }); // pass constructor values like so.
// const blue = new AppDrawer({ color: 'blue' }); // pass constructor values like so.
// const green = new AppDrawer({ color: 'green' }); // pass constructor values like so.

document.querySelector('#root').appendChild(green)
// document.querySelector('#root').appendChild(blue)
// document.querySelector('#root').appendChild(green)

// export default Component
