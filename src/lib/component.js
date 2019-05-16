const _options = {
  color: 'red',
  width: '200px',
  height: '300px'
}

class Component extends HTMLElement {
  constructor(options) {
    super()
    
    this.options = Object.assign({}, _options, options)
    
    this.createRectangle()
    this.initEvent()
    this.setRectangleStyle()
    this.initResizeEvent()
  }
  createRectangle() {
    this.shadow = this.attachShadow({ mode: 'open' })
    this.$elm = document.createElement('div')
    this.host = this.shadow.host
    this.$style = document.createElement('style')
    this.shadow.appendChild(this.$style)
    this.shadow.appendChild(this.$elm)
  }
  setRectangleStyle() {
    const { width, height, color } = this.options
    this.$elm.style = `width: ${width}; height: ${height}; background: ${color}; position: relative;`
    // this.$elm.style = `width: ${width}; height: ${height}; background: ${color}; position: relative;`
  }
  initEvent() {
    this.$after = document.createElement('div')
    this.$afterTop = document.createElement('div')
    this.$elm.appendChild(this.$after)
    this.$elm.appendChild(this.$afterTop)
    this.$afterTop.setAttribute('draggable', true)
    window.addEventListener('click', e => {
      if (e.path.indexOf(this.$elm) === -1 && e.path.indexOf(this.$after) === -1) {
        this.$after.style = ''
      } else {
        this.$after.style = 'content: ""; display: block; top: 0; left: 0; position: absolute; width: 100%; height: 100%; border: 3px solid #3899ec;'
        this.$afterTop.style = 'position: absolute; top: 0; left: 50%; width: 20px; height: 20px; border-radius: 50%; transform: translate(-50%, -50%); background: blue;'
      }
    })
  }
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
// console.log(document.createElement('app-drawer'))
const AppDrawer = customElements.get('app-drawer');
const yellow = new AppDrawer({ color: 'yellow' }); // pass constructor values like so.
const blue = new AppDrawer({ color: 'blue' }); // pass constructor values like so.
const green = new AppDrawer({ color: 'green' }); // pass constructor values like so.

document.querySelector('#root').appendChild(yellow)
// document.querySelector('#root').appendChild(blue)
// document.querySelector('#root').appendChild(green)

// export default Component
