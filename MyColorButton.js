import { MyButton } from "./MyButton.js"

export class MyColorButton extends MyButton {
  constructor(btnText, btnBgColor, btnTitle, fColor) {
    super(btnText, btnBgColor, btnTitle)
    this.fColor = fColor
  }

  show() {
    document.getElementById("task1").innerHTML += '<button style="background-color:' + this.btnBgColor + '; color:' + this.fColor + '" title="' + this.btnTitle + '">' + this.btnText + '</button>'
  }
}
