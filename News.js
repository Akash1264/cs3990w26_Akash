export class News {
  constructor(title, imgSrc, text) {
    this.title = title
    this.imgSrc = imgSrc

    this.text = text
    this.likes = 0
    this.id = "news-" + Math.floor(Math.random() * 10000)
  }

  incLikes() {
    this.likes++

    let starsEl = document.getElementById(this.id + "-stars")
    starsEl.innerHTML = '&#9733;'.repeat(this.likes)

    let counterEl = document.getElementById(this.id + "-counter")
    counterEl.textContent = this.likes
  }

  hide() {
    let img = document.getElementById(this.id + "-img")
    let title = document.getElementById(this.id + "-title")
    let text = document.getElementById(this.id + "-text")
    let likeBtn = document.getElementById(this.id + "-likebtn")

    img.style.opacity = "0.3"
    title.style.color = "darkgray"
    title.style.backgroundColor = "lightgray"
    text.style.color = "darkgray"
    text.style.backgroundColor = "lightgray"
    likeBtn.disabled = true
  }

  render() {
    let html = '<div class="news-item">'
      + '<h3 id="' + this.id + '-title">' + this.title + '</h3>'
      + '<div id="' + this.id + '-stars" class="stars" style="color:red; font-size:1.4rem;"></div>'
      + '<img id="' + this.id + '-img" src="' + this.imgSrc + '" width="200" />'
      + '<p id="' + this.id + '-text">' + this.text + '</p>'
      + '<p>likes: <span id="' + this.id + '-counter">0</span></p>'
      + '<button id="' + this.id + '-likebtn">LIKE</button>'
      + '<button id="' + this.id + '-hidebtn">HIDE</button>'
      + '</div>'

    return html
  }

  show(parentEl) {
    parentEl.innerHTML = this.render()

    let likeBtn = document.getElementById(this.id + "-likebtn")
    let hideBtn = document.getElementById(this.id + "-hidebtn")

    likeBtn.onclick = function() { this.incLikes() }.bind(this)
    hideBtn.onclick = function() { this.hide() }.bind(this)
  }
}
