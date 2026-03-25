import { MyButton } from "./MyButton.js"
import { arrTexts, arrColours } from "./MyArrays.js"

export function generateButtons() {
  let arrButtons = []
  arrTexts.forEach(function(text, i) {
    let colour = arrColours[i]
    let title = text + " is shown on the " + colour + " background"
    
    arrButtons.push(new MyButton(text, colour, title))
  })

  return arrButtons
}

export function displayButtons(arrButtons) {
  arrButtons.forEach(function(btn, i) {
    setTimeout(function() {
      btn.show()
    }, i * 3000)
  })
}
