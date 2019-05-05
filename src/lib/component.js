const _options = {
}

class Component extends HTMLElement {
  constructor(options) {
    super()
    
    this.options = Object.assign({}, _options, options)
    
    // const shadow = this.attachShadow({ mode: 'open' })

    // const wrapper = document.createElement('span')
    // wrapper.setAttribute('class', 'wrapper')

    var shadow = this.attachShadow({mode: 'open'});

    var div = document.createElement('div');
    div.innerHTML = 'KEN'
    var style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);


  }

}

export default Component