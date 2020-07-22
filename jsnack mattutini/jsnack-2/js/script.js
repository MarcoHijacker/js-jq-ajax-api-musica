// Es.2 Sum N numbers in array - 22 Luglio 2020 JS

// Chiedere all'utente quanti elementi vuole includere nell'array.
// Generare attraverso l'API (array/integers) un array contenente N numeri
// compresi tra 1 e 100.
// Stampare a schermo la somma dei numeri generati.

// Area init

function init() {
  arraySum();
}

$(document).ready(init);

// Definizione funzioni

function arraySum() {
  var count = prompt("Quanti numeri vuoi inserire nell'array?");

  $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/array/integers?min=1&max=100&items=' + count,
      method: 'GET',
      success: function(data) {
        var success = data['success'];
        var response = data['response'];

        if (success) {
          console.log(response);
          var arraySum = 0;
          for (var i = 0; i < response.length; i++) {
            arraySum += response[i];
          }
          alert("La somma dell'array generato con " + count + " numeri è: " + arraySum);
        } else {
        console.log('error');
      }

    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });

}
