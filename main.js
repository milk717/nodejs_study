var http = require('http');
var fs = require('fs')
var url = require('url');

function templateHTML(title, list, description){
    return `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
          `;
}

function templateList(filelist){
    var list = '<ul>';
    for(var i = 0; i<filelist.length; i++){
        list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list += '</ul>';
    return list;
}

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = (url).parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    var list;

    fs.readdir('./data',function (error,filelist){
        list = templateList(filelist);
        console.log(list);  //List Value Exists
    });

    if(pathname==='/'){ //root
        if(title === undefined){    //home
            console.log(list);      //undefined
            var template = templateHTML("Welcome",list,"Hello node.js!");
            response.writeHead(200);
            response.end(template);
        }else{
            fs.readFile(`data/${title}`,'utf-8',function (err, description){
                console.log(list);  //List Value Exists
                var template = templateHTML(title,list,description);
                response.writeHead(200);
                response.end(template);
            });
        }
    }else{ //error
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);   //port number
