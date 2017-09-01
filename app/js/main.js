var elem_test = document.getElementById('js-main-test');
elem_test.style.backgroundColor = "green";
elem_test.style.color = "white";

// Global
tetris = {};
tetris.figur_zaehler = 1;
tetris.spalten_pool = [];
tetris.spalten = 10;
tetris.zeilen = 10;
tetris.zeile_aktuell = 0;
tetris.delay_ebene_h_spalten = 200;

interval = {};
tetris.figuren = [
  // 'quadrat',  // ist das Null Element
  'quadrat',
  'lang',
  'dreierspitz',
  'zhochrechts',
  'zhochlinks',
  'lrechts',
  'llinks'
];

function init() {

  // füllen:
  for (var i = 1; i < tetris.spalten; i++) {
    tetris.spalten_pool.push(i);
  }
  console.log(tetris.spalten_pool);
}


function toggle() {
  const figur = document.getElementById('figur-test');

  if (figur.classList.contains('active')) {
    reset()
  }
  else {
    figurtest()
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


  var textNode = document.createTextNode('NEU' + tetris.figur_zaehler);
  tetris.figur_zaehler++;

  clone.replaceChild(textNode, clone.firstChild);
  clone.classList.add('active');
  clone.style.left = left + 'px';
  clone.style.top = top + 'px';


  document.body.appendChild(clone);
  const clone_animate = document.getElementById(clone_id);

  setTimeout(function () {
    clone_animate.classList.add('position-ende-zeile-3');

  }, 100);

  return true;
}

/**
 *
 *
 */
function reset() {
  const figur = document.getElementById('figur-test');
  figur.classList.remove('position-ende-zeile-3');
  figur.classList.remove('active');

  clearInterval(interval[tetris.zeile_aktuell]);

  init();
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
  aufbau_zeilen();
  var interval_zeilen = window.setInterval(aufbau_zeilen, 2000);

  if (tetris.zeile_aktuell === tetris.zeilen) {
    clearInterval(interval_zeilen)
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

  // Spalten abarbeiten:
  // fülle ein Array mit zahlen von 1 bis 10
  // nimm aus dem Array zufällig eine Zahl heraus,
  // mach das mit allen Zahlen, bis das Array leer ist

  // poolfüllen:
  init();
  tetris.zeile_aktuell++;

  var interval_spalten = window.setInterval(aufbau_spalten, tetris.delay_ebene_h_spalten);

  var durchlauf = 1;

  function aufbau_spalten() {
    // Solange nummern im Pool sind, weitermachen
    if (tetris.spalten_pool.length === 1) {
      clearInterval(interval_spalten);
    }

      var spalte = getFromPool();

      if (spalte > 0) {
        console.log(durchlauf + ' Spalte:' + spalte);

        var options = {};
        options.figur_id = 'figur-test';
        options.spalte = spalte;
        options.zeile = tetris.zeile_aktuell;
        bewegeFigur(options)
      }
      durchlauf++;
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