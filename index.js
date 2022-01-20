
const http = require('http');
const fs = require("fs");
const requests = require('requests');
const homeFile = fs.readFileSync("index.html", "utf-8");
const replaceVal = (tempVal, orgVal) => {
    let tempreature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    tempreature = tempreature.replace("{%tempmin%}",orgVal.main.temp_min);
    tempreature = tempreature.replace("{%tempmax%}",orgVal.main.temp_max);
    tempreature = tempreature.replace("{%location%}",orgVal.name);
   tempreature = tempreature.replace("{%country%}",orgVal.sys.country);
        return tempreature;
}
const { clearScreenDown } = require('readline');


const server = http.createServer((req, res) => {
    if (req.url = "/") {
        requests('https://api.openweathermap.org/data/2.5/weather?q=varanasi&appid=98dd67e02fcd7a61bb742925e0a5f160')
            .on('data', (chunk) => {
                       const objData = JSON.parse(chunk)
                       console.log(objData)
                       const arrdata = [objData];
                       const realTimeData = arrdata.map((val) => 
                      replaceVal(homeFile, val)).join("") 
                      res.write(realTimeData);
                    //   console.log(realTimeData);

                       })
                      .on('end', (err) => {
                       if (err) return console.log('connection closed due to errors', err);
                      res.end();
                        });

    }
});
server.listen(5500, "127.0.0.1");