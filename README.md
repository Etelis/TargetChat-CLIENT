<div style="width:100%">
    <div style="width:50%;">
        <div align="center">
        <img align="center" width="180" height="180" alt="CometChat" src="./Screenshots/logo.png">    
        </div>    
    </div>    
</div>

<br/><br/>


# Target Chat - Full Stack React ASP.NET SQL chat client and server application.

<p align="left">
    <a href="https://github.com/Etelis/TargetChat/releases/" alt="Releases">
        <img src="https://img.shields.io/github/v/release/Etelis/TargetChat" />
    </a>
    <a href="https://img.shields.io/github/languages/top/cometchat-pro/cometchat-pro-react-sample-app">
        <img src="https://img.shields.io/github/languages/top/Etelis/TargetChat" />
    </a>
    <a href="https://github.com/Etelis/TargetChat/stargazers">
        <img src="https://img.shields.io/github/stars/Etelis/TargetChat?style=social" />
    </a>
</p/Etelis/TargetChat

![alt text](./Screenshots/main.png "Main")

Target Chat is an open-source team collaboration Real-Time Ready Chat App written with React, ASP.NET, & SQL Database.


## Features
- Login
- Register
- Private(1-1) conversations.
- Rich Media Attachments including image, video and voice messages. 
- Read receipts
- Online Presence Indicators
- Message History
- Users & Friends List
- Search by users
- Conversations List
- User management
- Routing (React Router)
- Real-time
- Login by QR code.
  
 ## Technologies
* [React](https://github.com/facebook/react)
* [React-Bootstrap](https://react-bootstrap.github.io/)
* [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet)
* [React Router](https://reactrouter.com/docs/en/v6)


<hr/> 

## Prerequisites

Before git is imported, ensure you have met the specified requirements:

- React `npm install react`

- React ROUTER-DOM `npm install react-router-dom`

- React ROUTE `npm install react-router`

- React Scripts `npm install react-scripts`

- React Bootstrap `npm install react-bootstrap`

- Bootstrap `npm install bootstrap`

___

## Installing Target Chat 

1. Clone repository using `git clone https://github.com/Etelis/TargetChat/`

2. Install dependencies by following requirments section.

3. Create new react app from the following repository.
___

## Running the Chat application.

```javascript
  npm start
```
___

## Screens

Login Page:
![image](https://user-images.githubusercontent.com/92247226/165354919-14a3b495-b055-4b4f-addb-56b132f8251e.png)

Register Page:
![image](https://user-images.githubusercontent.com/92247226/165354958-da08aa15-73c8-40a1-aea0-e9c5050b15a0.png)

Main Chat:
![image](https://user-images.githubusercontent.com/92247226/165355108-847adaff-5997-46cc-9c4c-0e50604d1fd4.png)

---

# Replit - Preview:
You could check a full working application deployed to replit.
* [Target Chat](https://targetchat-3.etelis.repl.co/) on replit.
---

## Components:
 ## Registration:
 Registration component will allow registration of a new user, regisration form follows the following rules:
 - username field: user name field should at least have a single letter.
 - password field: password field should follow the following regex `/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/` - meaning a password should have at least one number and letter, also should be at least at the size of eight.
 - image field - user should specify profile image.
 
 if one of the requirment wasn't met a coresponding error will be shown.
 ![image](https://user-images.githubusercontent.com/92247226/165350130-2eacfc6d-f8c8-413a-90b0-bdce64002326.png)
 
  ## Login:
  login component will allow an existing user to login and retrive existing chats.
  login form follows the folloiwing rules:
   - username field: user name field should at least have a single letter.
 - password field: password field should follow the following regex `/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/` - meaning a password should have at least one number and letter, also should be at least at the size of eight.
   if one of the requirment wasn't met a coresponding error will be shown.
   ![image](https://user-images.githubusercontent.com/92247226/165351377-aa2628cd-a45f-4dc1-a227-ceabf84bb707.png)
   
   if user couldn't be found a coresponding error will be shown ( form will not indicate if a the user exists )
   ![image](https://user-images.githubusercontent.com/92247226/165353109-a37edfdb-14d3-436b-b405-6e2cbc2c6fd2.png)

  ## Recording:
  recording component will show a recording pop up to chat's footer allowing the user to record and upload a voice recording
  ![image](https://user-images.githubusercontent.com/92247226/165355464-fa994900-e462-44dc-8bbf-abde11bb090b.png)

  ## Media Items:
  media items as Images and videos will be warrped inside a coresponding component allowing on click full screen view
  ![image](https://user-images.githubusercontent.com/92247226/165355800-a4806eca-c4b9-4116-bce2-5d79ca9dfd98.png)

---
