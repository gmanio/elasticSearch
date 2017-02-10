/**
 * Created on 2017-02-11.
 * @author: Gman Park
 */

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

// client.search({
//     q: 'pants'
// }).then(function (body) {
//     var hits = body.hits.hits;
// }, function (error) {
//     console.trace(error.message);
// });


// client.search({
//     // index: 'stackoverflow',
//     // type: 'datas',
//     body: {
//         query: {
//             match: {
//                 content:'<p><em>(original title: Do some Android vendors'
//             }
//         },
//         size: 1000
//     }
// }).then(function (response) {
//     var hits = response.hits.hits;
// }, function (error) {
//     console.trace(error.message);
// });


client.search({
    body: {
        query: {
            match: {
                content: {
                    query: "<p>I uploaded a folder containing pictures",
                    "type" : "phrase"
                }
            }
        }
    }

}).then(function (response) {
    console.log(response.hits.hits);
}).catch(function (err) {
    console.log('Failed to search. ' + err.message);
});