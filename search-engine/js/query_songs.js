var loadingdiv = $('#loading');
var noresults = $('#noresults');
var resultdiv = $('#results');
var searchbox = $('input#search');
var timer = 0;

searchbox.keyup(function () {
  clearTimeout(timer);
  timer = setTimeout(search, 2000);
});

var getResponse = async function (search_term) {
  var url = 'http://100.25.193.196:9200/songs/_search';
  var jsonObject = '';

  var size = search_term.replace(/\D/g,'');

  jsonObject += '{';
    jsonObject += '"size":' + ((size>0) ? size : 50) + ','
    // jsonObject += '"sort":[{"track_rating":{"order":"desc"}}],'
    jsonObject += '"query":{'
      jsonObject += '"multi_match":{'
        jsonObject += '"query":"' + search_term + '",'
        // jsonObject += '"fuzziness":"AUTO",'
        // jsonObject += '"type":"phrase",'
        // jsonObject += '"slop":2,'
        jsonObject += '"fields": ['
          jsonObject += '"lyrics",'
          jsonObject += '"track_name_en",'
          jsonObject += '"track_name_si^2",'
          jsonObject += '"artist_name_en",'
          jsonObject += '"artist_name_si",'
          jsonObject += '"album_name_en",'
          jsonObject += '"album_name_si"'
        jsonObject += ']'
      jsonObject += '}'
    jsonObject += '}'
  jsonObject += '}'

  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: jsonObject
  })
  .then(function(response) {
    console.log('Response recieved.');
    return response.text();
  })
  .then(function(data){
    // Clear results
    noresults.hide();
    resultdiv.empty();
    loadingdiv.show();
    console.log('Data recieved.');
    var data_obj = JSON.parse(data);
    console.log(data_obj)
    return data_obj
  })
}


async function search() {
  noresults.hide();
  resultdiv.empty();
  loadingdiv.show();
  let query = searchbox.val();
  if (query.length > 1) {
    let response = await getResponse(query)
    let results = response['hits']['hits'];
    if (results.length > 0) {
      loadingdiv.hide();
      resultdiv.append('<p>ගීත ' + results.length + ' ක් හමුවුණි.</p>');
      for (var item in results) {
        let track_name_si = results[item]._source.track_name_si;
        let artist_name_si = results[item]._source.artist_name_si;
        let album_name_si = results[item]._source.album_name_si;
        let lyrics = results[item]._source.lyrics;

        while (lyrics.includes('%')) {
          lyrics = lyrics.replace('%', '  ')
        }
        resultdiv.append('<div class="result">' +
        '<div><h2><a href="' + '#' + '">' + track_name_si +
        '</a></h2><p>' + 'ගායනය' + ' &mdash; ' + artist_name_si +
        '</p><p>ඇල්බමය' + ' &mdash; ' + album_name_si +
        '</p><p>'+ lyrics + '</p></div></div>');
      }
    } else {
      noresults.show();
    }
  }
  loadingdiv.hide();
}
