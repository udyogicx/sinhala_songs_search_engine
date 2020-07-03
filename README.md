# sinhala_songs_search_engine
This repository includes the frontend impelementation and the song corpus of the Sinhala songs search engine.
# Directories
* images - sample query results
* search-engine - frontend implementation of the Sinhala songs search engine
* songs-lyrics.bulk - extracted and processed songs corpus from web
# Quick start instructions
1. Clone this repository.
2. Using https://www.elastic.co/downloads/ install elasticsearch to your local machine or remote server.
3. Upload songs-lyrics.bulk file using the elasticsearch API

`curl -XPOST http://<server-ip>:9200/_bulk?pretty --data-binary @songs-lyrics.bulk -H "Content-Type: application/json`

4. Change the variable ***url*** in search-engine/js/query_songs.js file by replacing the server ip address with your server ip address.
5. Open index.html file in search-engine directory to query songs.
# Example
Below shows a sample query searched in Sinhala songs search engine.
![alt text](https://github.com/udyogicx/sinhala_songs_search_engine/blob/master/images/sample-query.png?raw=true)
