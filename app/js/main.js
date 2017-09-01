console.log('main.js');
var elem_test=document.getElementById('js-main-test');
console.log(elem_test);
elem_test.style.backgroundColor = "green";
elem_test.style.color = "white";



function figurVonOben(){

  /*
  * figur
  * end-zeile
  * spalte
  *
  *
  *
  * */

  const figur = document.getElementById('figur-test');

  figur.classList.add('position-ende-zeile-3');


return true;
}

function reset() {
  const figur = document.getElementById('figur-test');

  figur.classList.remove('position-ende-zeile-3')

}