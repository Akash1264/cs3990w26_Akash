class Card {
  constructor(data) {
    this.data = data;
    this.isQuiz = data.hasOwnProperty("question");
    this.isDone = false;
    this.element = null;
  }

  render() {
    let block = $("<div>");
    let self = this;


    if (this.isQuiz) {
      block.append($("<p>").addClass("card-question").text(this.data.question));

      let optionsDiv = $("<div>").addClass("card-options");
      let radioName = "q" + Math.random().toString(36).substr(2, 5);
      this.data.options.forEach(function (opt) {
        let label = $("<label>").addClass("card-option");
        label.append($("<input>").attr("type", "radio").attr("name", radioName).val(opt));
        label.append(" " + opt);
        optionsDiv.append(label);
      });
      block.append(optionsDiv);

      let checkBtn = $("<button>").addClass("check-btn").text("Check");
      checkBtn.on("click", function (e) {
        e.stopPropagation();
        
        if (self.isDone) return;
        let selected = block.find("input:checked");
        if (!selected.length) return;

        if (selected.val() === self.data.correctAnswer) {
          showMessage("Good job!", "success");
          addScore(1);
        } else {
          showMessage("Wrong answer!", "error");
        }
        self.isDone = true;
        self.element.addClass("done");
        self.element.find(".card-front").html("<span class='done-text'>DONE</span>");
      });
      block.append(checkBtn);
    } else {
      block.append($("<i>").addClass("fa-solid " + this.data.value + " asset-icon"));
      block.append($("<p>").addClass("asset-desc").text(this.data.descriptin));
    }

    return block;
  }

  show(container) {
    container.empty().append(this.render());
  }
}