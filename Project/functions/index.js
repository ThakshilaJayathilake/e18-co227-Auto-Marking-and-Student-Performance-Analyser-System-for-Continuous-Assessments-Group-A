

const React = require("react");
const ReactDOM = require("react-dom");
const { BrowserRouter } = require("react-router-dom");
//for create a file
const ExcelJS = require('exceljs');

//for upload file
const path =require('path');
const fs =require('fs');

//sending mails
var nodemailer = require('nodemailer');

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


const fileUpload = require("express-fileupload");
const runtimeOpts = {

    setTimeout :300,
    
   // timeoutSeconds: 300,

}
   

/*
###########################   For multer you can use this code   ##############################################
const multer = require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images');
    },
    filename:(req,file,cb)=>{
        const{originalname}=file;
        cb(null,originalname);
    }
});
const upload = multer({storage:storage});
*/
//#############################################################################################################


//Main app
const app = express();
//for upload files
app.use(fileUpload({useTempFiles:true}));
app.use(cors({origin:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public/web4/'));
app.use(bodyParser.urlencoded({
    extended:true
}));



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
app.post("/api/createAssignment/:CourseName/:AssignmentName/:StartDate/:DueDate/:CoveredTopics/:Language/:url/:QTemplate/:ModelSol",(req,res)=>{
    (async()=>{
        try {
            await db.collection('Assignment').doc(`/${Date.now()}/`).create({
                AssignmentID : Date.now(),
                AssignmentName : req.params.AssignmentName,
                StartDate : req.params.StartDate,
                DueDate : req.params.DueDate,
                StartDate : req.params.StartDate,
                Language : req.params.Language,
                CoveredTopics : req.params.CoveredTopics,
                CourseName : req.params.CourseName,
                CoveredTopics : req.params.CoveredTopics,
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
app.post("/api/addStudent/:CourseName/:StudentName/:Eno/:username/:email/:phoneNo/:birthday/:gender",(req,res)=>{
    (async()=>{
        try {
            
            await db.collection('Students').doc(`/${Date.now()}/`).create({
                CourseName : req.params.CourseName,
                StudentName : req.params.StudentName,
                Marks : 0,
                AssignmentName : "",

                Eno : req.params.Eno,
                Username : req.params.username,
                Email : req.params.email,
                PhoneNo : req.params.phoneNo,
                Birthday : req.params.birthday,
                Gender : req.params.gender,
                

               
            });
            return res.status(200).send({status: 'Success',msg: "Data Saved"});
           
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({status: 'Failed',msg: error});
        }
        })();
    }
);

//Add Assignment for all Student-> Post()
app.post("/api/createMarks/:CourseName/:StudentName/:Eno/:Assignment",(req,res)=>{
    (async()=>{
        try {
            await db.collection('Marks').doc(`/${Date.now()}/`).create({
                CourseName : req.params.CourseName,
                StudentName : req.params.StudentName,
                Eno : req.params.Eno,
                Marks : 'Not Completed',
                AssignmentName : req.params.Assignment,
                id : Date.now(),

                

               
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
//########################################## Get One Element From A TABLE ##############################################


//Fetch - single data from firestore using specific id

//get user by its id
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
//get student by student name
app.get('/api/getUsername/:StudentName',(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Students').doc(req.params.StudentName);
            let Login = await reqDoc.get();
            let response = Login.data();
            

            return response;

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});
//get user by userName
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
//########################################## Get All Entries From A Table ##############################################
//Fetch - all data from Login Table

//get all users
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
//get all courses
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
//get all assignments
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
                        StartDate : doc.data().StartDate,
                        Language : doc.data().Language,
                        CoveredTopics : doc.data().CoveredTopics,
                        CourseName : doc.data().CourseName,
                        URL : doc.data().URL,
                        QTemplate : doc.data().QTemplate,
                        ModelSolution : doc.data().ModelSolution,
                        CoveredTopics :  doc.data().CoveredTopics,
                        StartDate :  doc.data().StartDate,
                        
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
//get all test cases
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
//get all students
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
                        Username : doc.data().Username, 
                        Eno  : doc.data().Eno ,
                        Email : doc.data().Email,
                        PhoneNo : doc.data().PhoneNo,
                        Birthday : doc.data().Birthday,
                        Gender : doc.data().Gender,

                        

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
//get all marks
app.get('/api/getAllMarks',(req,res)=>{
    (async()=>{
        try {
            const query = db.collection('Marks');
            let response =[];

            await query.get().then((data)=>{
                let docs = data.docs;
                docs.map((doc)=>{
                    const selectedItem = {
                        AssignmentName : doc.data().AssignmentName,
                        CourseName : doc.data().CourseName,
                        Eno : doc.data().Eno,
                        Marks : doc.data().Marks,
                        StudentName : doc.data().StudentName,
                        id : doc.data().id,
                        

                        

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
//update a user by id
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
//Update Marks Table-Marks -> put()
app.put("/api/updateMarks/:id/:marks",(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Marks').doc(req.params.id);
           // reqDoc.doc(req.params.StudentName);
            await reqDoc.update({
                Marks : req.params.marks,
                
                
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
//delete a user
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


//delete a student
app.delete("/api/deleteStd/:Eno",(req,res)=>{
    (async()=>{
        try {
            const reqDoc = db.collection('Student').doc(req.params.Eno);
            await reqDoc.delete();
            
            return res.status(200).send({status: 'Success',msg: "Data Removed"});

            
            
        } catch (error) {
            console.log(error)
            return res.status(500).send({status: 'Failed',msg: error});

            
        }
    })();

});

//------------------------------------------------ GITHUB AUTOMATION --------------------------------------------------
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
            driver.get("https://classroom.github.com/classrooms");
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
app.get('/api/getUrl/:courseName/:assignmentName/:DueDate/:setup/:run/:NoTests/:TestNames/:TestInputs/:TestOutputs/:TestMarks/:assignmentTemplate',(req,res)=>{  // ....................
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
            var service = new chrome.ServiceBuilder(); //.CreateDefaultService();
            service.enableVerboseLogging = true;
//service.EnableVerboseLogging = true;
            var driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).setChromeService(service).build();
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
            var setup_given =req.params.setup;        
            var run_given =req.params.run;
            setup_given = decodeURIComponent(setup_given); 
            run_given = decodeURIComponent(run_given); 
            names=decodeURIComponent(req.params.TestNames).split(',');
            inputs=decodeURIComponent(req.params.TestInputs).split(',');
            outputs=decodeURIComponent(req.params.TestOutputs).split(',');
            marks=decodeURIComponent(req.params.TestMarks).split(',');
            j=0;
            var addtestcase = await driver.findElement(By.id("view-options"));
            var testcaseType= await driver.findElement(By.xpath("//div[@class='SelectMenu-list']//span[text()='Input/Output test']"));
            var ele1=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][name]"));

            var setup=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][setup]"));
            var run=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][run]"));

            var ele2=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][input]"));
            var ele3=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][output]"));
            var ele4=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][points]"));
            var save =await driver.findElement(By.css(".js-save-test"));
            
            var num=req.params.NoTests;
            num=num;
            while (num){
                console.log(num);
                await addtestcase.click();
                await testcaseType.click();
                //await sleep(2000);
                ///var ele1=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][name]"));
                await ele1.clear();
                await ele1.sendKeys(names[j]);
                //await setup.clear();
                console.log(setup_given);
                if(setup_given.toString()=="null"){
                    console.log(setup_given+"oo");
                    //await setup.sendKeys(setup_given);
                }
                else{
                    console.log(setup_given);
                    await setup.sendKeys(setup_given);
                  //  await setup.sendKeys(" ");
                    

                }
                
                await run.clear();
                console.log(run_given);
                await run.sendKeys(run_given);
                //var ele2=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][input]"));
                await ele2.clear();
                await ele2.sendKeys(inputs[j]);
                //var ele3=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][output]"));
                await ele3.clear();
                await ele3.sendKeys(outputs[j]);
              //  var ele4=await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][points]"));
                
                await ele4.clear();
                await ele4.sendKeys(marks[j]);
                //await sleep(5000);
                await save.click();
                //await sleep(1000);
                j=j+1;
                num--;


            }
            

            //Create assignment
            await sleep(1000);
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
app.get('/api/getMarks/:StudentName/:courseName/:assignmentName',(req,res)=>{
    (async()=>{
        var driver;
        try {
            let name = req.params.StudentName;
            let course = req.params.courseName;
            let assignment = req.params.assignmentName;

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
            driver = new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(o).build(); 
            driver.manage().window().minimize();
            

            let path = "//h1[text()='"+course+"']";
            //Go to github classroom
            await driver.get("https://classroom.github.com/classrooms");
           // await driver.get("https://facebook.com");
          //  await driver.findElement(By.name("login")).click();
           // sleep(5000);
            //select the classroom
            
           // let path = "//h1[contains(.,'"+course+"')]";
            await driver.findElement(By.xpath(path)).click();
            
            //select the assignment
            let path2 = "//a[contains(.,'"+assignment+"')]";
            await driver.findElement(By.xpath(path2)).click();
            //search student by username
            await driver.findElement(By.id("search-query-field")).sendKeys(name,Key.ENTER);
            sleep(10000);
            
            //Get marks
            let value=await driver.findElement(By.className("repo-detail-item Counter")).getText();
            console.log(value);
            driver.quit();
            return res.status(200).send({status: 'Success',msg: value});
          
            
        } catch (error) {
            console.log(error);
            driver.quit();
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});

//######################################################################################################################
//############################################# DOWNLOAD FILES #########################################################
//Download file
app.get('/api/CreateFile/:Assignment/:NameList/:MarkList/:NumberOfStudents',(req,res)=>{
    (async()=>{
        
        try {
            var studentNo = req.params.NumberOfStudents;
            var nameList=[];
            nameList = req.params.NameList.split(',');
            var markList = [];
            markList= req.params.MarkList.split(',');

            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'Group07';
            workbook.lastModifiedBy = '';
            //workbook.created = new Date(2018,6,19);
            //workbook.modified = new Date();
            //workbook.lastPrinted = new Date(2016,7,27);
            
            var sheet = workbook.addWorksheet('MarksSheet') ;
            sheet.columns = [
                {header : 'Name', key : 'name'},
                {header : 'Marks' , key : 'mark'}
                
            ]
            for (i=0;i<studentNo;i++){
                sheet.addRow({name: nameList[i] , mark : markList[i]});

            }
           // sheet.addRow({name: "Sanduni" , mark : "100"});
            var filename = req.params.Assignment + ".xlsx";
            workbook.xlsx.writeFile("public/web4/examples/"+filename);
            
            return res.status(200).send({status: 'Success',msg: "nice"});
                
            
        } catch (error) {
            console.log(error);
            driver.quit();
            return res.status(500).send({status: 'Failed',msg: error});

            
        }

    })();

});

//######################################################################################################################
//############################################# UPLOAD FILES #########################################################
//File uploader
app.post('/api/upload',(req,res)=>{
    
    //console.log(req.body);
    var file = req.body.buffer;
    //console.log(file);
   
    var buffer = Buffer.from( new Uint8Array(file) );
    //console.log(buffer);
    
    //save the file to the path
    fs.writeFile("./public/web4/examples/uploadFiles/"+Date.now()+".xlsx",buffer, ()=>{

        return res.status(200).send({status: 'Success',msg: "Saved"});
    });
   
    console.log(req.headers['content-type']);
    return res.status(200).send({status: 'Success',msg: "Data Saved"});
   // return res.json({status:'OK'});
});

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'co227project@gmail.com',
        pass: 'aqgnmovabjpugysv'
    },
    tls:{
        rejectUnauthorized: false,
    }

});
app.post('/send_email/:senderName/:senderMail/:receiverMail/:msg',(req,res)=>{
    console.log("yes");
    var name = req.params.senderName;
    var sender = req.params.senderMail;
    var receiver = req.params.receiverMail;
    var msg = req.params.msg;
    var subject = 'message from :'+name+' : '+ sender;
    var mail={
        from: sender,
        to: receiver,
        subject: subject,
        text: msg
    }
    console.log(sender);
    console.log(receiver);
    console.log(msg);
    console.log(subject);
    
    transport.sendMail(mail,function(err,info){
        if(err){
            console.log(err);
            return res.status(200).send({status: 'Failed',msg: err});
        }
        else{
            console.log('success');
            return res.status(200).send({status: 'Success',msg: "Msg sent"});
        }

    })
});
//exports the api to firebase cloud functions
exports.app = functions.runWith(runtimeOpts).https.onRequest(app);






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
