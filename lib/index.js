!function (root, doc) {

  class Delegator {
    constructor(selector) {
      // TODO
      this.root = doc.querySelector(selector)
      this.events = {}
      this.handler = e => {
        let tar = e.target
        while (tar !== e.currentTarget) {
          this.events[e.type].forEach(each => {
            this.root.querySelectorAll(each.selector).forEach(ele => {
              ele === tar && each.fn.call(tar, e);
            })
          })
          tar = tar.parentNode
        }
      }
    }

    on(event, selector, fn) {
      // TODO
      if (!this.events[event]) {
        this.events[event] = [];
        this.root.addEventListener(event, this.handler)
      }
      this.events[event].push({
        selector, fn
      })
      return this
    }

    destroy() {
      // TODO
      for (let key in this.events) {
        this.root.removeEventListener(key, this.handler)
      }
      this.events = null
    }
  }

  root.Delegator = Delegator
}(window, document)


