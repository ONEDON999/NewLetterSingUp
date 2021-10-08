const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


 app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/signup.html');
 });


app.post('/', (req,res)=>{
 
    var fName = req.body.fn;
    var lName = req.body.ln;
    var email = req.body.email;

    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options ={
        url: "https://us5.api.mailchimp.com/3.0/lists/32d3917b0f",
        method: "POST",
        headers: {
            "Authorization" : "Christian1 3121a73fd886dd09374183a752dcf080-us5"
        },
         body:jsonData
    };
 
     request(options, function (error, response, body) {
         if(error){
             res.sendFile(__dirname + '/failure.html');
             
         }else{
             if(response.statusCode ===200){
                res.sendFile(__dirname + '/success.html');
             }else{
                res.sendFile(__dirname + '/failure.html');
             }
         }
    
 });
    
    
});

app.post('/failure.html', (req,res)=>{
    res.redirect('/');
});




app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is runing on port 3000');
})

// API
// 3121a73fd886dd09374183a752dcf080-us5

// List id
// 32d3917b0f

// curl -X POST \
//   'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>' \
//   --user "anystring:${apikey}"' \
//   -d '{"members":[],"update_existing":false}'