require("chromedriver");
const {Builder, By, Key, util} = require("selenium-webdriver");
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
const { Webdriver } = require("selenium-webdriver/lib/webdriver");
//var await driver1= webawait driver.chrome("C:\\Users\\HP\\AppData\\chromeawait driver_win32");
var o = new chrome.Options();

//You need to change on ypur own
o.addArguments("user-data-dir=C:/Users/ASUS/AppData/Local/Google/Chrome/User Data");
o.addArguments("--profile-directory=Profile 5");


var  driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(o).build(); 


async function example(){

    
     await driver.get("https://classroom.github.com/classrooms");
     //driver.navigate().refresh();
     //await new Promise(r => setTimeout(r, 2000));
  // <span class="_38oWvQ">Create a design</span>
  //   await driver.findElement(By.xpath("//button[text()='Create a design']")).click();
  //  await driver.findElement(By.className("btn btn-primary ml-2 flex-justify-end")).click();
  
  //   await driver.findElement(By.xpath("//a[text()='Create New Account']")).click();
  
     await driver.findElement(By.xpath("//h1[text()='test-for-coding-classroom-2']")).click();
    


   //  await new Promise(r => setTimeout(r, 2000));



    //--------------------------------------------------------------------------------------------------------
    //----------------------------GET MARKS---------------------------------------------------------
   // .border-top h3 a
    await driver.findElement(By.xpath("//a[contains(.,'Assignment For1111')]")).click();
    //await driver.findElement(By.xpath("h3[@class='f3 text-normal lh-condensed']//a[text()='Assignment For1111']")).click();
    //Thread.sleep(15000);
    
    //search-query-field
    await driver.findElement(By.id("search-query-field")).sendKeys("NirashaSewwandi",Key.ENTER);
   // sleep(15000);
    //Thread.sleep(15000);
    //repo-detail-item Counter
    let target = await driver.findElement(By.xpath("//span[@class='repo-detail-item Counter']"));
    //let target = await driver.findElement(By.className("repo-detail-item Counter"));
    var value = target.getText();
    //System.out.println(value);
    console.log(value);
    await driver.findElement(By.id("search-query-field")).sendKeys(value);
    await driver.get("google.com"+value);
    







    //--------------------------------------------------------------------------------------------------------
    //----------------------------CREATE AN ASSIGNMENT---------------------------------------------------------
    /*
    await driver.findElement(By.cssSelector("a[class='btn btn-primary right']")).click();

    await driver.findElement(By.id("assignment_title")).sendKeys("Assignment For1111");

    await driver.findElement(By.id("assignment_form_deadline")).sendKeys("7/7/2022");


    await driver.findElement(By.id("assignment_form_assignment_type")).sendKeys("individual");
    await driver.findElement(By.id("assignment_form_visibility_public")).sendKeys("public");
    await driver.findElement(By.id("new-assignment-submit")).click();


   
    await driver.findElement(By.cssSelector("#starter-code-repo-name")).click();
    // assignment_form[starter_code_repo_full_name]
    await driver.findElement(By.name("assignment_form[starter_code_repo_full_name]")).sendKeys("test-for-coding/template-for-java");
    Thread.sleep(15000);
    
    await driver.findElement(By.cssSelector(".autocomplete-suggestions-list ul li strong")).click();
    await driver.findElement(By.name("commit")).click();
    
    await driver.findElement(By.id("view-options")).click();
  //  .SelectMenu-list label span Input/Output test
    await driver.findElement(By.xpath("//div[@class='SelectMenu-list']//span[text()='Input/Output test']")).click();
    await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][name]")).sendKeys("Test1");
    await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][setup]")).sendKeys("javac Main.java");
    await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][run]")).sendKeys("java Main");
    await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][input]")).sendKeys("Test1");
    await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][output]")).sendKeys("Hello World!");
    await driver.findElement(By.name("assignment_form[assignment_tests_attributes][][points]")).sendKeys("10");
    await driver.findElement(By.cssSelector(".js-save-test")).click();

    await driver.findElement(By.name("commit")).click();
    
    await driver.findElement(By.xpath("//button[contains(text(),'Copy invitation link')]"));
    let BUTTON =await driver.findElement(By.cssSelector(".input-group-button button"));
    String attribute = BUTTON.getAttribute("data-clipboard-target");
    
    let target = await driver.findElement(By.cssSelector(attribute));
    String value = target.getAttribute("value");
    System.out.println(value);
*/
    driver.quit();



}
function pageRedirect() {
    window.location.replace("https://www.tutorialrepublic.com/"+value);
}    
example();
//location.href="index.html";
//    document.getElementById("demo").innerHTML =value;