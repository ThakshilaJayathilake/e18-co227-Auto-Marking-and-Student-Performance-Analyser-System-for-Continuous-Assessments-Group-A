---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e18-co227-Auto-Marking-and-Student-Performance-Analyser-System-for-Continuous-Assessments-Group-A
title:
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Auto Marking and Student Performance Analyser System for Continuous Assessments

---


## Table of Contents
1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Solution](#solution)
4. [Phase I](#phase-i---auto-marking-system-for-coding-assessments)
5. [Phase II](#phase-ii---student-performance-analyser)
6. [Solution Architecture](#solution-architecture)
7. [REST API](#rest-api)
8. [Additional Features](#additional-features)
9. [Project Plan](#project-plan)
10. [Team](#team)
11. [Links](#links)



## Introduction


 The Department of Computer Engineering uses many coding based assignments for continuous assessment of student learning. The instructors have to spend a lot of time manually marking these assignments which is not the ideal use of the instructors’ time. 
 
Therefore, we build a system for auto marking coding assignments : **_GRADINGENIUS_**
 
This system supports automated recording and analysis of student performance. It shows how that particular student progressed with their assignments and what are the strengths and weaknesses of that student.



## Problem Statement



<p align="center">
<img src="https://user-images.githubusercontent.com/73567971/174825976-ac937a86-b7f7-4f5a-8f24-6b3a175e9b4c.jpg" width="300" height="300"></p>


Have your ever in your life works as an instructor ?

Specially for a course like java or C or any programming related course
For a instructor definetly will give many assignments to students. And need to mark them. How to mark those programs?

Run those one by one and do all these by manually?

For our department there are 60 students for a batch and fututre it will increase. So what happen if wish to run those code one by one and need to check some test cases by run each test case. In that case, they will be definitely tired and the system would be inefficient.

Actually it is very time consuming and tough work. If there is an easier way to spend that time for teach students or for any other task, it would be great.



## Solution


<p align="left">
<img src="https://user-images.githubusercontent.com/73567971/174826181-01f3f994-e6b0-4fca-b5ff-abf228af8690.png" width="200" height="300"></p>


Our solution is automated testing which leads to _GRADINGENIUS_ platform.
Below phases add functionalities for the system


# FUNCTIONALITIES

## Phase I - Auto Marking System for Coding Assessments

#### Appication Content
- User friendly Web Interface for instructors to mark the assignments
- Auto marking processed with GitHub Classroom
- User can create courses, assignments and add students according to their preference
- Finally instructor can view the marks of the each student under each course

#### Implementation of Design
- Welcome Page
<p align="left">
<img src="https://user-images.githubusercontent.com/73390233/176609623-87d004f2-a2a4-49e3-aeda-acf6dd5a8ed9.png" width="600" height="300"></p>

- Sign UP
<p align="left">
<img src="https://user-images.githubusercontent.com/73390233/176609668-f5caefb3-306b-41a9-86f9-2c291d7c8ca2.png" width="600" height="300"></p>

- Sign IN
<p align="left">
<img src="https://user-images.githubusercontent.com/73390233/176611977-56af1630-3ddf-43fa-aefc-44d0f300002c.png" width="600" height="300"></p>


- Courses
<p align="left">
<img src="https://user-images.githubusercontent.com/73390233/176611028-36b37d62-f634-4de2-8d04-e9f85bf575db.png" width="600" height="300"></p>


- Add Student
<p align="left">
<img src="https://user-images.githubusercontent.com/73390233/176609851-8fb91495-e93c-4f79-a5f1-e682e4636b31.png" width="600" height="300"></p>

- Add assignment
<p align="left">
<img src="https://user-images.githubusercontent.com/73390233/176609932-c3cbdbbc-d8ae-4871-8658-7d6f52d00ae2.png" width="600" height="300"></p>


#### Use Case Diagram

<img src="https://user-images.githubusercontent.com/73567971/176608106-d59f84a5-ef49-4906-82d9-c050d35c65d3.png" width="700" height="700">



## Phase II - Student Performance Analyser

#### Appication Content
- User friendly Web Interface for instructors to analyse student performance
- Using this web interface user can easily identify the progress of each student with the assignments
- Student can identify their strengths and weeknesses



## Solution Architecture
 
<p align="left">
<img src="https://user-images.githubusercontent.com/73567971/176610119-d4e06168-5b06-43f3-84e7-d9538ff1eea7.png" width="700" height="400"></p>


1. User ; instructor interact by using web inetrfaces
2. Extract data from web; Assignment details
3. Forward wanted to GITHUB Classroom; Auto-Grading tool
4. Generate to do assignemnt repo link, share with students
5. Students interact with instructor through GitHub platform
6. Get the marks and remarks
7. Used the automated process by Selenium for that
8. Generate results and Visualization through web application

## REST API
> Web interface can be connected with the backend firebase database directly. But it is better to use an API to connect them together. So, we implemented a REST API to connect with database, not only for backend but also it gives many advantages to the system. It is more efficient to use an API. So, our implemeted API can connect with Firebase, communicate with GitHub classroom and have many more features.

- ### Functions Implemented

   - __CRUD operations for the backend__
    
   - __Communicate with GitHub classroom__
    
      > - Function to create a new course
      > - Function to create a new assignment
      > - Function to get marks of a student
    
    

## Additional Features

- #### Download Marks Feature

   > Inside the Students tag under Courses, there is are mark lists according to the assignments. So, there the system displayed the marks of each student belongs to that course for each assignment separately. 
   > Also, instructor can download each and every assignment marks of the class. 
   > here is a special feature also, user can refresh the assignment marks of the student. So, instructor can view marks upto date.


- #### Add Students By Uploading File To The System
       
   > There is an upload feature to upload all student details. So, instructor no needs to add students to the course one by one.
   > Other than that user can use the given sample file. 
   > Then insert the student details to the file and then upload it to the system.
   
   
- #### Seperated profile for each enrolled students
       
   > Instructor can easily view wanted details of student easily ; batch, specified course's lectures & instructor panel.
   > Student's performance through out the course are viewed graphically.
   > Each student's specific talented area & weakly performances are listed.

## Project Plan

<img width="700" height="500" alt="Timeline" src="https://user-images.githubusercontent.com/73390233/172594754-d36740dd-5c5d-47ec-89ad-e64c636a69a8.png">


## Team

### **Developers:**
-  E/18/036, BANDARA L.R.M.U., [email](mailto:e18036@eng.pdn.ac.lk)
-  E/18/156, JAYATHILAKE W.A.T.N., [email](mailto:e18156@eng.pdn.ac.lk)
-  E/18/329, SEWWANDI D.W.S.N., [email](mailto:e18329@eng.pdn.ac.lk)


### **Project Owner:**
- Dr. Mahanama Wickramasinghe

### **Scrum Master:**
- Ms. Poornima Lankani


## Links

- [Project Repository](https://github.com/cepdnaclk/{{ page.repository-name }}){:target="_blank"}
- [Project Page](https://cepdnaclk.github.io/{{ page.repository-name}}){:target="_blank"}
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)


[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
