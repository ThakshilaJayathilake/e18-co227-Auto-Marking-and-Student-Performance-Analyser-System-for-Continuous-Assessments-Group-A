

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

//Create New Assignment in GitHub Classroom and generate the url and return it.
app.get('/api/getUrl',(req,res)=>{
    (async()=>{
        try {
            
            //sleep function to sleep the process
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            //setup the browser
            const {Builder,By,Key, Capability, Capabilities} = require("selenium-webdriver");
            var chrome = require('selenium-webdriver/chrome');
            var o = new chrome.Options();

            //#############################################################################################
            //You should change this on your own
            o.addArguments("--user-data-dir=C:/Users/HP/AppData/Local/Google/Chrome/User Data/");
            o.addArguments("--profile-directory=Profile 3");
            //#############################################################################################
            
            o.addArguments("start-minimized");
            o.excludeSwitches("enable-automation");
            var driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).build();
            driver.manage().window().minimize();


    
            //Go the github classroom and create new assignment
            await driver.get("https://classroom.github.com/classrooms");
            
            await driver.findElement(By.xpath("//h1[text()='test-for-coding-classroom-2']")).click();

            await driver.findElement(By.css("a[class='btn btn-primary right']")).click();

            //page I
            await driver.findElement(By.id("assignment_title")).sendKeys("Assignment ForMe812225");
            await driver.findElement(By.id("assignment_form_deadline")).sendKeys("7/7/2022");
            await driver.findElement(By.id("assignment_form_assignment_type")).sendKeys("individual");
            await driver.findElement(By.id("assignment_form_visibility_public")).sendKeys("public");
            await driver.findElement(By.id("new-assignment-submit")).click();

            //page II
  
            await driver.findElement(By.css("#starter-code-repo-name")).click();
            await driver.findElement(By.name("assignment_form[starter_code_repo_full_name]")).sendKeys("test-for-coding/template-for-java");
            await sleep(5000);
            await driver.findElement(By.css(".autocomplete-suggestions-list ul li strong")).click();
            await driver.findElement(By.name("commit")).click();
            
            //page III
            await driver.findElement(By.xpath("//div[@class='SelectMenu-list']//span[text()='Input/Output test']")).click();
            await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][name]")).sendKeys("Test1");
            await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][setup]")).sendKeys("javac Main.java");
            await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][run]")).sendKeys("java Main");
            await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][input]")).sendKeys("Test1");
            await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][output]")).sendKeys("Hello World!");
            await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][points]")).sendKeys("10");
            await sleep(5000);
            await driver.findElement(By.css(".js-save-test")).click();


            //Create assignment
            await sleep(5000);
            await driver.findElement(By.name("commit")).click();
    
            //Get the url
            let BUTTON =await driver.findElement(By.css(".input-group-button button")).getAttribute("data-clipboard-target");
            let target = await driver.findElement(By.css(BUTTON)).getAttribute("value");
            driver.quit();
    
            return res.status(200).send({status: 'Success',msg: target});
    


            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});


//Get marks of a student by GitHub username
app.get('/api/getMarks/:StudentName',(req,res)=>{
    (async()=>{
        try {
            let name = req.params.StudentName;
            

            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            //Setup browser
            const {Builder,By,Key, Capability, Capabilities} = require("selenium-webdriver");
            var chrome = require('selenium-webdriver/chrome');
            var o = new chrome.Options();
            //#############################################################################################
            //You should change this on your own
            o.addArguments("--user-data-dir=C:/Users/HP/AppData/Local/Google/Chrome/User Data/");
            o.addArguments("--profile-directory=Profile 3");
            //#############################################################################################
            o.addArguments("start-minimized");
            o.excludeSwitches("enable-automation");
            var driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).build(); 
            driver.manage().window().minimize();


    
            //Go to github classroom
            await driver.get("https://classroom.github.com/classrooms");
            //select the classroom
            await driver.findElement(By.xpath("//h1[text()='test-for-coding-classroom-2']")).click();
            
            //select the assignment
            await driver.findElement(By.xpath("//a[contains(.,'Assignment For1111')]")).click();
            //search student by username
            await driver.findElement(By.id("search-query-field")).sendKeys(name,Key.ENTER);
            sleep(10000);
            
            //Get marks
            let value=await driver.findElement(By.className("repo-detail-item Counter")).getText();
            console.log(value);
            driver.quit();
            return res.status(200).send({status: 'Success',msg: value});
          
            
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
