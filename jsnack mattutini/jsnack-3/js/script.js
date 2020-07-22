// Es.3 Array Number Guess Game - 22 Luglio 2020 JS

// Con l'aiuto dell'API Boolean a questo indirizzo (www.boolean.careers/api/array/integers?min=minvalue&max=maxvalue&nItems=number, ), creare un array di 50 numeri compresi tra 1 e 100
// Chiedere all'utente un numero compreso tra 1 e 100. Se il numero è compreso tra i 50 numeri precedentemente estratti allora il gioco continua, altrimenti termina.
// Qualora finisca indicare quanti numeri corretti sono stati indovinati

// Area init

function init() {
  arrayGame();
}

$(document).ready(init);

// Definizione funzioni

function arrayGame() {

  $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/array/integers?min=1&max=100&items=50',
      method: 'GET',
      success: function(data) {
        var success = data['success'];
        var response = data['response'];

        if (success) {
          console.log(response);
          takeNumber(response);
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

function takeNumber(array) {
  var userNumber = parseInt(prompt("Inserisci un numero da 1 a 100:"));
  var guessedNumbers = 0;

  while(array.includes(userNumber)) {
    guessedNumbers++;
    userNumber = parseInt(prompt("Indovinato! Inserisci un altro numero da 1 a 100:"))
  }

  alert("Questo numero non era presente. Hai terminato la partita con un punteggio di " + guessedNumbers);
}

// Risoluzione a lezione

// function getRandomInt() {
//     $.ajax({
//         url: 'https://flynn.boolean.careers/exercises/api/array/integers?min=1&max=100&items=50',
//         method: 'GET',
//         success: function(data) {
//             var success = data['success'];
//             var arr = data['response'];
//             userRandomIntTest(arr);
//         },
//         error: function(err) {
//             console.log('err', err);
//         }
//     });
// }
// function userRandomIntTest(arr) {
//     console.log('arr', arr);
//     var cont = true;
//     while(cont) {
//         var number = parseInt(prompt('get me integer number'));
//         var indexOfNumber = arr.indexOf(number);
//         console.log(indexOfNumber);
//         if (indexOfNumber >= 0) {
//             console.log('ok');
//             arr.splice(indexOfNumber, 1);
//             if (arr.length < 1) {
//                 cont = false;
//             }
//         } else {
//             cont = false;
//         }
//     }
//     console.log('the end w/ ' + (50 - arr.length));
// }
