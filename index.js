const http=require("http");
const fs=require("fs");
var requests=require("requests");
const homefile=fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal, orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature = temperature.replace("{%location%}",orgVal.name);
    return temperature;
};
const server= http.createServer((req,res)=>{
    if(req.url=="/")
    {
        requests('https://api.openweathermap.org/data/2.5/weather?q=bangalore&appid=b8b72865f623c8687f35df2714df4d40'
         )
        .on("data", (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrData=[objdata];
         // console.log(arrData[0].main.temp);
            const realTimeData = arrData 
            .map((val)=> replaceVal(homefile, val))
            .join("");
            res.write(realTimeData);
            //console.log(realTimeData);
        })
        .on("end", (err) => {
          if (err) return console.log('connection closed due to errors', err);
         res.end();
        });
    }

});
server.listen(8000, "127.0.0.1");