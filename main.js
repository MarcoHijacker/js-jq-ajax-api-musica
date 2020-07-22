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

            addAlbumListener(); // Funzione che implementa il filtro dei generi musicali
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

function addAlbumListener() {
  var target = $('#genre-sel option'); // Al click su una delle options nel select

  target.click(function() {
    var genreSel = $(this).val(); // Salvo il valore dell'option nel select

    console.log(genreSel);

    if(genreSel == 'All') { // Selezione diversa da 'Tutti i generi'
      $('div.cd').show(); // Mostro tutti gli album incondizionatamente
    } else { // Se seleziono 'Tutti i generi', mostro tutti gli album
      $('div.cd').hide();  // Nascondo tutti i div degli album
      $('span.' + genreSel).parent('div').show(); // Mostro solo quelli che hanno classe relativa al genere
    }
  });
}
