

const React = require("react");
const ReactDOM = require("react-dom");
const { BrowserRouter } = require("react-router-dom");


const { VisionUIControllerProvider } = require("context");
const functions = require("firebase-functions");

const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://group07-co227-default-rtdb.firebaseio.com"
});

const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");


//Main app
const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(express.static('public/web4/'))
app.use(bodyParser.urlencoded({
    extended:true
}))

//Main databse reference
const db =admin.firestore();


//Routes
app.get('/t',(req,res)=>{
   // res.set({
      //  "ALLow-access-ALLow-Origin":'*'
   // })
   
   return res.status(200).send("Hi how");
    
});





//Create an Account-> Post()
app.post("/api/create/:UserName/:Password",(req,res)=>{
    (async()=>{
        try {
            await db.collection('Login').doc(`/${Date.now()}/`).create({
                id : Date.now(),
                UserName :req.params.UserName,
                Password : req.params.Password,
               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
           // return res.redirect("http://localhost:9000/group07-co227/us-central1/app/index.html");
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);

app.post("/api/signUp",(req,res)=>{
    
    (async()=>{
        try {

            const reqDoc = db.collection('Login').doc(req.body.UserName);
            let Login = await reqDoc.get();
            let response1 = Login.data();

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        UserName :doc.data().UserName,
                        Password : doc.data().Password,
                     //   address : doc.data().address,

                    };
                    response1.push(selectedItem);
                });
                
            });




            
            if(response1){
                return res.status(500).send({status: 'pass',msg: error});
            }
        
            await db.collection('Login').doc(`/${Date.now()}/`).create({
                id : Date.now(),
                UserName :req.body.UserName,
                Password : req.body.Password,
               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
          //  return res.redirect("http://localhost:9000/group07-co227/us-central1/app/index.html");
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);


//get-> get()
//Fetch - single data from firestore using specific id
app.get('/api/get/:id',(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Login').doc(req.params.id);
            let Login = await reqDoc.get();
            let response = Login.data();
            

            return response;

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});
//Fetch - single data from firestore using specific userName
app.get('/api/getName/:UserName',(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Login').doc(req.params.UserName);
            let Login = await reqDoc.get();
            let response = Login.data();


            return response;

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});


//Fetch - all data from firestore 
app.get('/api/getAll',(req,res)=>{
    (async()=>{
        try {
            const query = db.collection('Login');
            let response =[];

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        UserName :doc.data().UserName,
                        Password : doc.data().Password,
                     //   address : doc.data().address,

                    };
                    response.push(selectedItem);
                });
                return response;
            });

            return res.status(200).send({status: 'Success',data : response});
            //return response;
            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

})

//Update -> put()
app.put("/api/update/:id",(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Login').doc(req.params.id);
            await reqDoc.update({
                UserName :req.body.UserName,
                Password : req.body.Password,
              //  address : req.body.address,
            });
            
            return res.status(200).send({status: 'Success',msg: "Data Updated"});

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }
    })();

});

//Delete -> delete()
app.delete("/api/delete/:id",(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Login').doc(req.params.id);
            await reqDoc.delete();
            
            return res.status(200).send({status: 'Success',msg: "Data Removed"});

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }
    })();

});
//exports the api to firebase cloud functions
exports.app = functions.https.onRequest(app);






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
