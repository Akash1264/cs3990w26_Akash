export class MyButton {
  constructor(btnText, btnBgColor, btnTitle) {
    this.btnText = btnText
    this.btnBgColor = btnBgColor
    this.btnTitle = btnTitle
  }

  show() {
    document.getElementById("task1").innerHTML += '<button style="background-color:' + this.btnBgColor + '" title="' + this.btnTitle + '">' + this.btnText + '</button>'
  }
}
