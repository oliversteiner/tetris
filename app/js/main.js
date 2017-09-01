// Test
// var elem_test = document.getElementById('js-main-test');
// elem_test.style.backgroundColor = "green";
// elem_test.style.color = "white";

// Global
var tetris = {
  play: false,
  figur_zaehler: 1,
  spalten_pool: [],
  spalten: 10,
  zeilen: 20,
  zeile_aktuell: 0,
  delay_ebene_h_spalten: 100,
  figuren: [
    'quadrat',
    'lang',
    'dreierspitz',
    'zhochrechts',
    'zhochlinks',
    'lrechts',
    'llinks'
  ]

};

function init() {

  // füllen:
  for (var i = 1; i < tetris.spalten; i++) {
    tetris.spalten_pool.push(i);
  }
  console.log(tetris.spalten_pool);
}

/**
 *
 *
 */
function play() {
  tetris.play = true;
  var $play_button = document.getElementsByClassName('play-button')[0];
  var $reset_button = document.getElementsByClassName('reset-button')[0];

  // Playbutton ausblenden
  $play_button.style.display = 'none';
  $reset_button.style.display = 'block';

  rain()

}

/**
 *
 *
 */
function reset() {
  console.log('reset');
  tetris.play = false;
  var $play_button = document.getElementsByClassName('play-button')[0];
  var $reset_button = document.getElementsByClassName('reset-button')[0];



  interval.clearAll();

  var nodes = document.getElementsByClassName('figur'),
      i = nodes.length;

  while(i--) {
    nodes[i].classList.remove('bounceAndRotate');
  }
  removeGeneratedFigures();


      init();
  $play_button.style.display = 'block';
  $reset_button.style.display = 'none';
}

function toggle() {
  if (tetris.play === false) {
    play();
  }
  else {
    reset();

  }


}

/**
 *
 *
 * @param figur
 * @param spalte
 * @param zeile
 * @returns {boolean}
 */
function bewegeFigur(options) {


  var figur_id = options.figur_id;
  var zeile = options.zeile;
  var left = options.spalte * 50;

  var top = 850 - (50 * zeile);

  var clone_id = 'figur-' + tetris.figur_zaehler;
  const figur = document.getElementById(figur_id);
  var clone = figur.cloneNode(true);
  clone.id = clone_id;

  tetris.figur_zaehler++;

  clone.classList.add('active');
  clone.style.left = left + 'px';
  clone.style.top = top + 'px';
  clone.style.display = 'block';


  document.body.appendChild(clone);
  const clone_animate = document.getElementById(clone_id);

  setTimeout(function () {

    var duration = getRandomIntInclusive(15, 45);

    // clone_animate.classList.add('position-ende');
    clone_animate.classList.add('bounceAndRotate');
    clone_animate.style.animationDuration = duration + '00ms';
    //  clone_animate.classList.add('rotate90');

  }, 100);

  return true;
}



/**
 *
 *
 * @returns {*|string}
 */
function randomFigur() {
  var zufall = getRandomIntInclusive(0, 6);
  return tetris.figuren[zufall];
}

/**
 *
 *
 */
function rain() {
  tetris.play = true;
  aufbau_zeilen();
  interval.make(aufbau_zeilen, 1000);

  if (tetris.zeile_aktuell === tetris.zeilen) {
    // clearInterval(interval_zeilen)
    interval.clearAll();
  }
}


/**
 * delay : zeit zwischen zwei figuren
 *
 */
function aufbau_zeilen() {
  console.log('-------------  neue zeile  ----------------');
  console.log(tetris.zeile_aktuell);
  console.log(tetris.zeilen);
  console.log(tetris.delay_ebene_h_spalten);

  if (tetris.zeile_aktuell === tetris.zeilen) {
    interval.clearAll();
  }

  // Spalten abarbeiten:
  // fülle ein Array mit zahlen von 1 bis 10
  // nimm aus dem Array zufällig eine Zahl heraus,
  // mach das mit allen Zahlen, bis das Array leer ist

  // poolfüllen:
  init();
  tetris.zeile_aktuell++;

  interval.make(aufbau_spalten, tetris.delay_ebene_h_spalten);

  var zaehler = 1;

  function aufbau_spalten() {
    // Solange nummern im Pool sind, weitermachen
    if (tetris.spalten_pool.length === 1) {
      // clearInterval(interval_spalten);
      interval.clear(0);
    }

    var spalte = getFromPool();

    if (spalte > 0) {
      console.log(zaehler + ' Spalte:' + spalte);

      var options = {};
      options.figur_id = 'figur-' + randomFigur();
      options.spalte = spalte;
      options.zeile = tetris.zeile_aktuell;
      bewegeFigur(options)
    }
    zaehler++;
  }

  // Die zeit vom herunterfallen mit jedem durchlauf verzögern
  tetris.delay_ebene_h_spalten += 10;
}

function animate() {
  var all_blocks = document.getElementsByClassName('block');
}


function getFromPool() {
  var anzahl = tetris.spalten_pool.length;
  var zufall_zahl = getRandomIntInclusive(1, anzahl);
  return tetris.spalten_pool.splice(zufall_zahl, 1);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function figurtest() {
  var options = {};
  options.figur_id = 'figur-test';
  options.spalte = 1;
  options.zeile = 1;

  bewegeFigur(options)
}


// Verwalten der einzelnen Intervals:
var interval = {
  //to keep a reference to all the intervals
  intervals: {},

  //create another interval
  make: function (fun, delay) {
    //see explanation after the code
    var newInterval = setInterval.apply(
        window,
        [fun, delay].concat([].slice.call(arguments, 2))
    );

    this.intervals[newInterval] = true;

    return newInterval;
  },

  //clear a single interval
  clear: function (id) {
    return clearInterval(this.intervals[id]);
  },

  //clear all intervals
  clearAll: function () {
    var all = Object.keys(this.intervals), len = all.length;

    while (len-- > 0) {
      clearInterval(all.shift());
    }
  }
};

function removeGeneratedFigures() {

  var $container_figuren = document.getElementById('container-figuren');
  $container_figuren.parentNode.removeChild($container_figuren);


}