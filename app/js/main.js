console.log('main.js');
var elem_test = document.getElementById('js-main-test');
console.log(elem_test);
elem_test.style.backgroundColor = "green";
elem_test.style.color = "white";

 figur_zaehler = 1;

function toggle() {
  const figur = document.getElementById('figur-test');

  if (figur.classList.contains('active')) {
    reset()
  }
  else {

    var options = {};
    options.figur_id = 'figur-test';
    options.spalte = 1;
    options.zeile = 1;
    figurVonOben(options)

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
function figurVonOben(options) {


  var figur_id = options.figur_id;
  var spalte = options.spalte;
  var zeile = options.zeile;


  const figur = document.getElementById(figur_id);

  var newelement = figur.cloneNode(true);
  newelement.id = 'figur-'+ figur_zaehler;

  figur_zaehler++;

  newelement.classList.add('active');
  newelement.classList.add('position-ende-zeile-3');

  console.log(newelement);


  const root = document.getElementById('playground');

  console.log(root);

  root.appendChild(newelement);



  return true;
}

function reset() {
  const figur = document.getElementById('figur-test');
  figur.classList.remove('position-ende-zeile-3');
  figur.classList.remove('active');

}


function rain() {

  var anzahl_spalten = 10;  // 31
  var anzahl_zeilen = 17;

  var spalte = 1;
  var zeile = 1;


  var i = -1;
  (function f() {
    i = (i + 1) % anzahl_spalten;

    console.log('rain : ' + i);

    var options = {};
    options.figur_id = 'figur-test';
    options.spalte = i + 1;
    options.zeile = 1;
    figurVonOben(options);
    setTimeout(f, 500);
  })();

}
