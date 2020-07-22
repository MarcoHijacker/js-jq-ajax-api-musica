// Area init

function init() {
  grabAlbums();
}

$(document).ready(init);

// Definizione funzioni

function grabAlbums() {
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/array/music',
    method: 'GET',
    success: function(data) {
      var success = data['success'];
      var response = data['response']; // Array di oggetti, ognuno contenente un album

      if (success) {
        for (var i = 0; i < response.length; i++) { // Scorro gli oggetti nell'array restiuitomi dall'API
          // Salvo ogni contenuto di chiave in una var omonima
          var poster = response[i].poster;
          var title = response[i].title;
          var author = response[i].author;
          var genre = response[i].genre;
          var year = response[i].year;
          // Recupero il template nella head sfruttando Handlebars
          var template = $('#album-template').html();
          var compiled = Handlebars.compile(template);
          var target = $('#showcase');
          var albumHTML = compiled({ // Sostituisco nei segnaposti {{ item }} le variabili con il contenuto
              'poster': poster,
              'title': title,
              'author': author,
              'genre': genre,
              'year': year,
              'genre': genre
            });
            target.append(albumHTML); // Faccio append nel div#showcase

        }
      } else {
        console.log('error');
      }
      addAlbumListener(); // Funzione che implementa il filtro dei generi musicali

    },
    error: function(request, state, error) {
      console.log('request', request);
      console.log('state', state);
      console.log('error', error);
    }
  });
}

function addAlbumListener() {
  var target = $('#genre-sel'); // Target : menu select

  target.change(function() { // Al variare della option nel select
    var genreSel = $(this).val(); // Salvo il valore del select

    if(genreSel == 'All') { // Selezione 'Tutti i generi'
      $('div.cd').show(); // Mostro tutti gli album incondizionatamente
    } else { // Altrimenti
      $('div.cd').hide();  // Nascondo tutti i div degli album
      $('span.' + genreSel).parent('div').show(); // E mostro solo quelli che hanno classe relativa al genere
      // Questo perché con Handlebars ho aggiunto una classe col nome del genere (vedi HTML)
    }
  });
}
