const express=require("express")
const bodyparser=require("body-parser")
const request=require("request")
const https=require("https")

const app=express()

app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const email=req.body.email
    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data)
    const url="https://us8.api.mailchimp.com/3.0/lists/224745e141"
    const options={
        method: "POST",
        auth: "rafat:9b90bfdce1ff8155145da0b9c73f282c-us8"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata)
    request.end()
})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server is running at port 3000");
})



// 9b90bfdce1ff8155145da0b9c73f282c-us8
// 224745e141