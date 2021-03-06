import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

export const DIRECTIONS = {
  TOPLEFT: 0,
  TOP: 1, 
  TOPRIGHT: 2,
  RIGHT: 3,
  BOTTOMRIGHT: 4,
  BOTTOM: 5,
  BOTTOMLEFT: 6,
  LEFT: 7
}
const DIRECTION = (DIRNUM) => Object.keys(DIRECTIONS)[DIRNUM]
const resize = ($elm, $target, DIRNUM) => {
  let DIR = DIRECTION(DIRNUM)
  let clicked = false
  let client = {
    clientX: 0,
    clientY: 0
  }

  $elm.addEventListener('mousedown', e => {
    // e.stopPropagation()
    e.preventDefault()
    clicked = true
    client = {
      clientX: e.clientX,
      clientY: e.clientY
    }
  }, true)

  const mousemoves = fromEvent(document, 'mousemove')
  const result = mousemoves.pipe(debounce(() => interval(0)))
  result.subscribe(e => {
    e.preventDefault()
    // e.stopPropagation()
    if (clicked === true) {
      // e.stopPropagation()
      resizeEvent(e)
      client = {
        clientX: e.clientX,
        clientY: e.clientY
      }
    }
  })

  window.addEventListener('mouseup', (e) => {
    // e.stopPropagation()
    e.preventDefault()
    if (clicked) {
      resizeEvent(e)
      clicked = false
    }
  }, true)

  const resizeEvent = (e) => {
    // e.stopPropagation()
    e.preventDefault()
    if (clicked) {
      switch (DIR) {
        case 'TOP': {
          $target.style.height = parseInt($target.style.height) + Number(client.clientY) - Number(e.clientY) + 'px'
          $target.style.top = parseInt($target.style.top) - (Number(client.clientY) - Number(e.clientY)) + 'px'
          return
        }
        case 'TOPRIGHT': {
          $target.style.height = parseInt($target.style.height) + Number(client.clientY) - Number(e.clientY) + 'px'
          $target.style.top = parseInt($target.style.top) - (Number(client.clientY) - Number(e.clientY)) + 'px'
          $target.style.width = parseInt($target.style.width) + Number(e.clientX) - Number(client.clientX) + 'px'
          return
        }
        case 'TOPLEFT': {
          $target.style.height = parseInt($target.style.height) + Number(client.clientY) - Number(e.clientY) + 'px'
          $target.style.top = parseInt($target.style.top) - (Number(client.clientY) - Number(e.clientY)) + 'px'
          $target.style.width = parseInt($target.style.width) + Number(client.clientX) - Number(e.clientX) + 'px'
          $target.style.left = parseInt($target.style.left) + (Number(e.clientX) - Number(client.clientX)) + 'px'
          return
        }
        case 'RIGHT': {
          $target.style.width = parseInt($target.style.width) + Number(e.clientX) - Number(client.clientX) + 'px'
          return
        }
        case 'BOTTOMRIGHT': {
          $target.style.width = parseInt($target.style.width) + Number(e.clientX) - Number(client.clientX) + 'px'
          $target.style.height = parseInt($target.style.height) + Number(e.clientY) - Number(client.clientY) + 'px'
          return
        }
        case 'BOTTOM': {
          $target.style.height = parseInt($target.style.height) + Number(e.clientY) - Number(client.clientY) + 'px'
          return
        }
        case 'BOTTOMLEFT': {
          $target.style.height = parseInt($target.style.height) + Number(e.clientY) - Number(client.clientY) + 'px'
          $target.style.width = parseInt($target.style.width) + Number(client.clientX) - Number(e.clientX) + 'px'
          $target.style.left = parseInt($target.style.left) + (Number(e.clientX) - Number(client.clientX)) + 'px'
          return
        }
        case 'LEFT': {
          $target.style.width = parseInt($target.style.width) + Number(client.clientX) - Number(e.clientX) + 'px'
          $target.style.left = parseInt($target.style.left) + (Number(e.clientX) - Number(client.clientX)) + 'px'
          return
        }
      }
    }
  }
}


export default resize