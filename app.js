

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const port =  process.env.PORT || 3000


app.use('*/css',express.static('public/css'));
app.use('*/image',express.static('public/image'));
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html")

})

app.post("/", function(req, res){
    const firsName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = { 
        members: [
            {
            
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firsName,
                    LNAME:lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/ce7a71864f"
    const options = {
        method : "POST",
        auth : "marius robert:29941f2a7c7fa60648e72406e2f3ebb9-us17"
    }

    const request = https.request(url, options,function(response){
        if (response.statusCode ===200){
            res.sendFile(__dirname+ "/success.html")
        }else{
            res.sendFile(__dirname+ "/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();
})

app.post("/failure.html", function(req, res){
    res.redirect("/");    
})


app.listen(port, function(){
    console.log("Server is running on port " + port);
})



// API Key
// 29941f2a7c7fa60648e72406e2f3ebb9-us17

// List ID
// ce7a71864f