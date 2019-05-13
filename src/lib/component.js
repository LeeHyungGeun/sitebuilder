import aggregation from './aggregation'
const _options = {
  color: 'blue'
}

// const _LCLASS = aggregation(Resize, Rectangle)

class Component extends HTMLElement  {
  constructor(options) {
    super()
    
    this.options = Object.assign({}, _options, options)
    
    this.initEvent()
    this.createRectangle()
    this.initResizeEvent()
  }
  createRectangle() {
    var shadow = this.attachShadow({ mode: 'open' })
    var div = document.createElement('div')
    div.style = `width: 500px; height: 300px; background: ${this.options.color}; position: relative;`
    var style = document.createElement('style')
    this.$elm = div
    shadow.appendChild(style)
    shadow.appendChild(div)
    this.host = shadow.host
  }
  initEvent() {
    window.addEventListener('click', (e) => {
      this.$elm.after.style = 'content: ""; display: block; position: absolute; width: 100%; height: 100%; border: 1px solid #3899ec'
      if (e.path.indexOf(this.$elm) === -1) {
        this.$elm.style.border = ''
      } else {
        this.$elm.after.style = 'content: ""; display: block; position: absolute; width: 100%; height: 100%; border: 1px solid #3899ec'
      }

    })
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

export default Component
