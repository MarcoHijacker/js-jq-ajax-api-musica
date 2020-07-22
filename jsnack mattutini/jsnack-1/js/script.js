// Es.1 Array names list - 22 Luglio 2020 JS

// Chiedere all'API 10 nomi da inserire in un array di invitati.
// Una volta generata la lista chiedere all'utente di dire il proprio nome. Se è uno
// degli invitati ritornare un messaggio di benvenuto, altrimenti di accesso
// negato.

// Area init

function init() {
  listGenerator();
}

$(document).ready(init);

// Definizione funzioni

function listGenerator() {
  var listaInv = [];

  for (var i = 0; i < 10; i++) {

    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/random/name',
      method: 'GET',
      success: function(data) {
        var success = data['success'];
        var response = data['response'];

        if (success) {
          listaInv.push(response.toLowerCase());

          if(listaInv.length === 10) { // Mi garantisco di stampare ed operare sull'array quando si è effettivamente riempito
            console.log(listaInv);
            giveMeName(listaInv); // Così posso passare l'array con la lista alla funzione giveMeName()
          }
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

  // console.log(listaInv); // Le chiamate AJAX di sopra hanno latenza più alta e si rischia di stampare un array vuoto

}

function giveMeName(array) {
  var givenName = (prompt('Inserisci il tuo nome e cognome: ')).toLowerCase();

  if (array.includes(givenName)) {
    alert('Sei nella lista, puoi entrare!');
  } else {
    alert('Non sei in lista, mi spiace.');
  }
}
