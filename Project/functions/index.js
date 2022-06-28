

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




//######################################################################################################################
//##########################################Creating An Entry In A Table################################################
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

//Create New Course-> Post()
app.post("/api/createCourse/:UserName/:CourseCode/:CourseName",(req,res)=>{
    (async()=>{
        try {
            await db.collection('Courses').doc(`/${Date.now()}/`).create({
                CourseID : Date.now(),
                UserName : req.params.UserName,
                CourseCode : req.params.CourseCode,
                CourseName : req.params.CourseName,

               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
           
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);

//Create New Assignmnet-> Post()
app.post("/api/createAssignment/:CourseName/:AssignmentName/:DueDate/:Language/:url/:QTemplate/:ModelSol",(req,res)=>{
    (async()=>{
        try {
            await db.collection('Assignment').doc(`/${Date.now()}/`).create({
                AssignmentID : Date.now(),
                AssignmentName : req.params.AssignmentName,
                DueDate : req.params.DueDate,
                Language : req.params.Language,
                CourseName : req.params.CourseName,
                URL : req.params.url,
                QTemplate : req.params.QTemplate,
                ModelSolution : req.params.ModelSol,
               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
           
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);
//Create TestCases-> Post()
app.post("/api/createTestCase/:AssignmentName/:TestCaseName/:Input/:Output/:Points",(req,res)=>{
    (async()=>{
        try {
            await db.collection('TestCases').doc(`/${Date.now()}/`).create({
        
                AssignmentName : req.params.AssignmentName,
                TestCaseName : req.params.TestCaseName,
                Input : req.params.Input,
                Output : req.params.Output,
                Points : req.params.Points,

               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
           
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);

//Add Student-> Post()
app.post("/api/addStudent/:CourseName/:StudentName",(req,res)=>{
    (async()=>{
        try {
            await db.collection('Students').doc(`/${Date.now()}/`).create({
                CourseName : req.params.CourseName,
                StudentName : req.params.StudentName,
                Marks : 0,
                AssignmentName : "",
                

               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
           
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);



//######################################################################################################################
//##########################################Get One Element From A TABLE################################################

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



//######################################################################################################################
//##########################################Get All Entries From A Table################################################
//Fetch - all data from Login Table
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

});
app.get('/api/getAllCourses',(req,res)=>{
    (async()=>{
        try {
            const query = db.collection('Courses');
            let response =[];

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        UserName :doc.data().UserName,             
                        CourseCode : doc.data().CourseCode,
                        CourseName : doc.data().CourseName,
                     

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
app.get('/api/getAllAssignments',(req,res)=>{
    (async()=>{
        try {
            const query = db.collection('Assignment');
            let response =[];

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        AssignmentName : doc.data().AssignmentName,
                        DueDate : doc.data().DueDate,
                        Language : doc.data().Language,
                        CourseName : doc.data().CourseName,
                        URL : doc.data().URL,
                        QTemplate : doc.data().QTemplate,
                        ModelSolution : doc.data().ModelSolution,
                    };
                    response.push(selectedItem);
                });
                return response;
            });

            return res.status(200).send({status: 'Success',data : response});
            
            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

})
app.get('/api/getAllTestCases',(req,res)=>{
    (async()=>{
        try {
            const query = db.collection('TestCases');
            let response =[];

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        AssignmentName : doc.data().AssignmentName,
                        TestCaseName : doc.data().TestCaseName,
                        Input : doc.data().Input,
                        Output : doc.data().Output,
                        Points : doc.data().Points,

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
app.get('/api/getAllStudents',(req,res)=>{
    (async()=>{
        try {
            const query = db.collection('Students');
            let response =[];

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        AssignmentName : doc.data().AssignmentName,
                        CourseName : doc.data().CourseName,
                        Marks : doc.data().Marks,
                        StudentName : doc.data().StudentName,
                        

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

//######################################################################################################################
//###############################################Update Entry In A Table################################################
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
//Update Student Table-Assignment -> put()
app.put("/api/updateAssignment/:CourseName",(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Students').doc(req.params.CourseName);
            await reqDoc.update({
                AssignmentName : req.body.AssignmentName,
                
            });
            
            return res.status(200).send({status: 'Success',msg: "Data Updated"});

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }
    })();

});
//Update Student Table-Marks -> put()
app.put("/api/updateMarks/:StudentName",(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Students').doc(req.params.StudentName);
            await reqDoc.update({
                Marks : req.body.Marks,
                
            });
            
            return res.status(200).send({status: 'Success',msg: "Data Updated"});

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }
    })();

});


//######################################################################################################################
//###############################################Delete Entry In A Table################################################
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
//######################################################################################################################
//######################################################Create Course###################################################

//Create New Course(classroom) in GitHub Classroom 
app.post('/api/createCourseGITHUB/:CourseName',(req,res)=>{
    (async()=>{
        try {
            let Cname = req.params.CourseName;
            
            
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
            o.addArguments("--user-data-dir=C:/Users/ASUS/AppData/Local/Google/Chrome/User Data/");
            o.addArguments("--profile-directory=Profile 5");
            //#############################################################################################
            
            o.addArguments("start-minimized");
            o.excludeSwitches("enable-automation");
            var driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).build();
            driver.manage().window().minimize();


    
            //Go the github classroom and create new assignment
            await driver.get("https://classroom.github.com/classrooms");
            
            await driver.findElement(By.css("#js-filtering-form a")).click();
            await driver.findElement(By.name("organization[github_id]")).click();
        
            let field = await driver.findElement(By.id("organization_title"));
            field.clear();
            field.sendKeys(Cname);
            await driver.findElement(By.name("commit")).click();

            driver.quit();
            var driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).build();
            driver.manage().window().minimize();


    
            //Go the github classroom and create new assignment
            await driver.get("https://classroom.github.com/classrooms");
            
            let path = "//h1[text()='"+Cname+"']";
            await driver.findElement(By.xpath(path)).click();

            await driver.findElement(By.xpath("//a[text()='Create an assignment']")).click();

            await driver.findElement(By.id("assignment_title")).sendKeys("Sample");
            await driver.findElement(By.id("new-assignment-submit")).click();
            await driver.findElement(By.name("commit")).click();
            await driver.findElement(By.name("commit")).click();
/*
/*
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
            */
            driver.quit();
    
            return res.status(200).send({status: 'Success',msg: "Successfully created"});
    


            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});

//######################################################################################################################
//######################################################GET URL#########################################################

//Create New Assignment in GitHub Classroom and generate the url and return it.
// app.get('/api/getUrl/:courseName/:assignmentName/:DueDate/:NoTests/:TestNames/:TestInputs/:TestOutputs/:TestMarks',(req,res)=>{
app.get('/api/getUrl/:courseName/:assignmentName/:DueDate/:NoTests/:TestNames/:TestInputs/:TestOutputs/:TestMarks/:assignmentTemplate',(req,res)=>{  // ....................
    (async()=>{
        try {
            // console.log(decodeURIComponent(assignmentTemplate));
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
            o.addArguments("--user-data-dir=C:/Users/ASUS/AppData/Local/Google/Chrome/User Data/");
            o.addArguments("--profile-directory=Profile 5");
            //#############################################################################################
            
            o.addArguments("start-minimized");
            o.excludeSwitches("enable-automation");
            var driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).build();
            driver.manage().window().minimize();


    
            //Go the github classroom and create new assignment
            await driver.get("https://classroom.github.com/classrooms");
            var cName= req.params.courseName
            let path = "//h1[text()='"+cName+"']";
            await driver.findElement(By.xpath(path)).click();

            await driver.findElement(By.css("a[class='btn btn-primary right']")).click();

            //page I
            var assName= req.params.assignmentName;
            var duedate=req.params.DueDate;

            await driver.findElement(By.id("assignment_title")).sendKeys(assName);
            await driver.findElement(By.id("assignment_form_deadline")).sendKeys(duedate);
            await driver.findElement(By.id("assignment_form_assignment_type")).sendKeys("individual");
            await driver.findElement(By.id("assignment_form_visibility_public")).sendKeys("public");
            await driver.findElement(By.id("new-assignment-submit")).click();

            //page II
            var assTemp=req.params.assignmentTemplate;            // ....................
            var assTemplate = decodeURIComponent(assTemp);        
            
            await driver.findElement(By.css("#starter-code-repo-name")).click();
            // await driver.findElement(By.name("assignment_form[starter_code_repo_full_name]")).sendKeys("test-for-coding/template-for-java");
            await driver.findElement(By.name("assignment_form[starter_code_repo_full_name]")).sendKeys(assTemplate);         // ....................
            await sleep(5000);
            await driver.findElement(By.css(".autocomplete-suggestions-list ul li strong")).click();
            await driver.findElement(By.name("commit")).click();
            
            //page III
            let names=[];
            let inputs=[];
            let outputs=[];
            let marks=[];
            
            names=req.params.TestNames.split(',');
            inputs=req.params.TestInputs.split(',');
            outputs=req.params.TestOutputs.split(',');
            marks=req.params.TestMarks.split(',');
            j=0;
            var ele1=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][name]"));
            var ele2=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][input]"));
            var ele3=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][output]"));
            var ele4=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][points]"));
            var setup=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][setup]"));
            var run=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][run]"))

            var num=req.params.NoTests;
            for (i=0;i<num;i++){
                
                await driver.findElement(By.id("view-options")).click();
                await driver.findElement(By.xpath("//div[@class='SelectMenu-list']//span[text()='Input/Output test']")).click();
                await sleep(2000);
                ///var ele1=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][name]"));
                ele1.clear();
                ele1.sendKeys(names[j]);
                setup.sendKeys("javac Main.java");
                run.sendKeys("java Main");
                //var ele2=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][input]"));
                ele2.clear();
                ele2.sendKeys(inputs[j]);
                //var ele3=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][output]"));
                ele3.clear();
                ele3.sendKeys(outputs[j]);
              //  var ele4=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][points]"));
                
                ele4.clear();
                ele4.sendKeys(marks[j]);
                //await sleep(5000);
                await driver.findElement(By.css(".js-save-test")).click();
                await sleep(5000);
                j++;


            }
            

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

//######################################################################################################################
//############################################## GET MARKS FROM GITHUB #################################################
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
            o.addArguments("--user-data-dir=C:/Users/ASUS/AppData/Local/Google/Chrome/User Data/");
            o.addArguments("--profile-directory=Profile 5");
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
