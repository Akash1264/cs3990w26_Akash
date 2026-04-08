/* =====================================================
   TASK 1 – NumberGenerator
   ===================================================== */

class NumberGenerator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.value = 0;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="num-gen-controls">
        <button class="arrow-btn less-btn" title="Less">&#11015;</button>
        <span id="num-display">${this.value}</span>
        <button class="arrow-btn greater-btn" title="Greater">&#11014;</button>
      </div>
      <button class="generate-btn">Make your number now!</button>
      <div id="news-block"></div>
    `;
    this.display = this.container.querySelector('#num-display');
  }

  bindEvents() {
    this.container.querySelector('.generate-btn').addEventListener('click', () => {
      this.value = Math.floor(Math.random() * 101);
      this.update();
    });

    this.container.querySelector('.less-btn').addEventListener('click', () => {
      this.value--;
      this.update();
    });

    this.container.querySelector('.greater-btn').addEventListener('click', () => {
      this.value++;
      this.update();
    });
  }

  update() {
    this.display.textContent = this.value;
    generateNewsBlock(this.value);
  }
}

function generateNewsBlock(count) {
  const block = document.getElementById('news-block');
  block.innerHTML = '';

  const loremText = `Lorem Ipsum originated as early as 45 BC when Roman scholar Marcus Tullius Cicero wrote
    De Finibus Bonorum et Malorum (On the Boundaries of Good and Evil). This treatise discusses
    various philosophical topics including ethics and politics.`;

  for (let i = 1; i <= count; i++) {
    const item = document.createElement('div');
    item.className = 'news-item';

    const title = document.createElement('div');
    title.className = 'news-title';
    title.textContent = `Title #${i}`;

    const body = document.createElement('div');
    body.className = 'news-body';
    body.textContent = loremText;

    const footer = document.createElement('div');
    footer.className = 'news-footer';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove ✖';
    removeBtn.addEventListener('click', () => item.remove());

    footer.appendChild(removeBtn);
    item.appendChild(title);
    item.appendChild(body);
    item.appendChild(footer);
    block.appendChild(item);
  }
}

new NumberGenerator('task1-container');


/* =====================================================
   TASK 2 – ColorButton & PaletteMenu
   (Event Delegation + Object Handler approach)
   ===================================================== */

class ColorButton {
  constructor(color, targetId) {
    this.color = color;
    this.targetId = targetId;
  }

  createElement() {
    const cell = document.createElement('div');
    cell.className = 'color-cell';
    cell.style.background = this.color;
    cell.dataset.color = this.color;
    return cell;
  }
}

class PaletteMenu {
  constructor(paletteEl, targetId) {
    this.paletteEl = paletteEl;
    this.targetId  = targetId;

    // Capture the original background ONCE before any interaction
    const target = document.getElementById(targetId);
    this.originalBg    = window.getComputedStyle(target).backgroundColor;
    this.originalColor = window.getComputedStyle(target).color;

    // Object handler: single object with handleEvent dispatches all event types
    paletteEl.addEventListener('click',     this);
    paletteEl.addEventListener('mouseover', this);
    paletteEl.addEventListener('mouseout',  this);
  }

  handleEvent(e) {
    const cell = e.target.closest('.color-cell');
    if (!cell) return;

    const target = document.getElementById(this.targetId);
    const color  = cell.dataset.color;

    if (e.type === 'click') {
      // Click → change FONT color permanently
      target.style.color = color;
      // Update stored color so mouseout doesn't reset it
      this.originalColor = color;
    } else if (e.type === 'mouseover') {
      // Mouseover → temporarily change BACKGROUND only
      target.style.backgroundColor = color;
    } else if (e.type === 'mouseout') {
      // Mouseout → restore original background
      target.style.backgroundColor = this.originalBg;
    }
  }
}

function generatePalette(wrapperId, targetId) {
  // Two rows of colors matching the assignment screenshot
  const colors = [
    // Row 1
    'black', 'gray', '#c0392b', 'red', 'yellow', 'green', '#00bcd4', 'blue', 'purple',
    // Row 2
    'white', '#aaaaaa', '#cd853f', 'pink', '#f5deb3', '#90ee90', 'lightblue', '#b0c4de', '#dda0dd'
  ];

  const wrapper = document.createElement('div');
  wrapper.className = 'color-palette';
  wrapper.id = wrapperId;

  colors.forEach(c => {
    const btn = new ColorButton(c, targetId);
    wrapper.appendChild(btn.createElement());
  });

  document.getElementById('palette-container').appendChild(wrapper);
  new PaletteMenu(wrapper, targetId);
}

generatePalette('palette-wrapper', 'text-block');


/* =====================================================
   TASK 3 – Sweeties Menu
   ===================================================== */

(function () {
  const sweetImages = {
    Cake:  'Cake.jpeg',
    Donut: 'Donut.jpeg',
    Honey: 'Honey.jpeg'
  };

  const menu   = document.getElementById('sweeties-menu');
  const title  = menu.querySelector('.menu-title');
  const arrow  = title.querySelector('.arrow');
  const list   = menu.querySelector('ul');
  const imgBox = document.getElementById('sweet-image');
  let open = false;

  title.addEventListener('click', () => {
    open = !open;
    list.style.display = open ? 'block' : 'none';
    arrow.textContent  = open ? '▼' : '▶';

    if (!open) {
      list.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
      imgBox.innerHTML = '';
    }
  });

  list.addEventListener('click', e => {
    const li = e.target.closest('li');
    if (!li) return;

    list.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
    li.classList.add('selected');

    const sweet = li.dataset.sweet;
    const img = document.createElement('img');
    img.src = sweetImages[sweet];
    img.alt = sweet;
    imgBox.innerHTML = '';
    imgBox.appendChild(img);
  });
})();


/* =====================================================
   TASK 4 – Fruit, btnColor, RatedFruit
   (jQuery + Event Delegation)
   ===================================================== */

const hannaFruits = [
  { fruit: 'apple', color: 'red'   },
  { fruit: 'pear',  color: 'green' },
  { fruit: 'mango', color: 'red'   },
  { fruit: 'plum',  color: 'blue'  },
];

class Fruit {
  constructor(name, color, rating = Math.floor(Math.random() * 6)) {
    this.name   = name;
    this.color  = color;
    this.rating = rating;
  }

  createListItem() {
    const li = document.createElement('li');
    li.style.background = this.color;
    li.style.color      = 'black';   // initially black text
    li.dataset.color    = this.color;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = this.name;

    const label = document.createElement('span');
    label.className   = 'rated-label';
    label.textContent = ' Star Rating: ';

    const ratingWrapper = document.createElement('span');
    ratingWrapper.className = 'star-rating';

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className    = 'star' + (i <= this.rating ? ' orange' : '');
      star.dataset.star = i;
      star.textContent  = '★';
      ratingWrapper.appendChild(star);
    }

    li.appendChild(nameSpan);
    li.appendChild(label);
    li.appendChild(ratingWrapper);
    return li;
  }

  show() {
    document.querySelector('#fruits ul').appendChild(this.createListItem());
  }
}

class RatedFruit extends Fruit {
  constructor(name, color, rating) {
    super(name, color, rating);
  }
}

class btnColor {
  constructor(color) {
    this.color = color;
  }

  show() {
    const btn = document.createElement('span');
    btn.className        = 'color-btn';
    btn.textContent      = this.color;
    btn.style.background = this.color;
    btn.dataset.color    = this.color;
    if (this.color === 'white') btn.style.color = '#333';
    document.getElementById('colors').appendChild(btn);
  }
}

// Populate 4 fruits with random initial star ratings
hannaFruits.forEach(f => new Fruit(f.fruit, f.color).show());

// Populate unique color buttons
const uniqueColors = [...new Set(hannaFruits.map(f => f.color))];
uniqueColors.forEach(c => new btnColor(c).show());

// jQuery Event Delegation – color buttons: highlight fruits + change text to white
$('#colors').on('click', '.color-btn', function () {
  const color = $(this).data('color');
  $('.color-btn').removeClass('active');
  $(this).addClass('active');

  // Reset all fruits: remove highlight, restore black text
  $('#fruits ul li').removeClass('highlighted').css('color', 'black');

  // Matching fruits: add highlight + change text to white
  $('#fruits ul li').filter(function () {
    return $(this).data('color') === color;
  }).addClass('highlighted').css('color', 'white');
});

// jQuery Event Delegation – star rating click
// Stars are rendered left→right (1→5).
// Clicking star N: fill star N + all to its LEFT (prevAll) orange, rest (nextAll) black.
$('#fruits').on('click', '.star', function () {
  const $star   = $(this);
  const $rating = $star.closest('.star-rating');

  $rating.find('.star').removeClass('orange');  // reset all to black
  $star.addClass('orange');                      // clicked star → orange
  $star.prevAll('.star').addClass('orange');     // all stars to the LEFT → orange
});