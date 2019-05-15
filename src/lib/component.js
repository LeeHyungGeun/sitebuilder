const _options = {
  color: 'red',
  width: '200px',
  height: '300px'
}

class Component extends HTMLElement {
  constructor(options) {
    super()
    
    this.options = Object.assign({}, _options, options)
    
    this.initEvent()
    this.createRectangle()
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
    // window.addEventListener('click', (e) => {
    //   this.$elm.after.style = 'content: ""; display: block; position: absolute; width: 100%; height: 100%; border: 1px solid #3899ec'
    //   if (e.path.indexOf(this.$elm) === -1) {
    //     this.$elm.style.border = ''
    //   } else {
    //     this.$elm.after.style = 'content: ""; display: block; position: absolute; width: 100%; height: 100%; border: 1px solid #3899ec'
    //   }
    // })
  }
  initResizeEvent() {
    this.$elm.setAttribute('draggable', true)
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
document.querySelector('#root').appendChild(blue)
document.querySelector('#root').appendChild(green)

// export default Component
