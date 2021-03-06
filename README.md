# e-Motion
# Facial expression detection &amp; training; customizable flashcard web application

# 1. Log in and Authentication
# What we have done:
We build a register and login page for the e-Motion website:
1.1 Use express framework to build a server and communicate frontend with backend;
1.2 Create MySQL database to store user information;
1.3 Use HTML/CSS/JQuery to design multi-page website structure.

# Going forward:
1.4 Consolidate multi-page website structure and eliminate vulnerabilities;
1.5 Interact with Quizlet API to better present the user data in the form of flashcards;
1.6 Complete MySQL database to store user uploaded images and expression detection results.


# 2. Upload Image and Detect Emotion
# What we have done:
We used node.js to create a server that handles image upload from html form on and launching another html page on local host to access the Microsoft Face API.
2.1 "uploadImage_HackNYU19.html" is a page that allows user to select one or multiple image(s), and to upload them to server. It sends a html form to local host server.
2.2 "server_HackNYU19.js" uses the express web framework. Its main functions include: (1) It handles POST request from "uploadImage_HackNYU19.html" page and stores images in designated local directories; it collects the paths to all images uploaded to server for later use in emotion detection. It launches the "detectEmotion_HackNYU19.html" page on a new server and redirects from uploadImage to detectEmotion web page. (2) It handles GET request from "detectEmotion_HackNYU19.html" to provide the earlier image paths (currently, we have not fully implemented this functionality). 
2.3 "detectEmotion_HackNYU19.html" is a page that accesses the Microsoft Face (Emotion) API to obtain face attributes from image; it picks out and displays the emotion that has the highest confidence. Currently, we use hard-coded image urls to demonstrate the functionality of accessing the face detection API and selecting the most likely emotion string (We will continue to work on the GET request mentioned earlier to get the paths to the uploaded images).
 
# Going forward:
2.4 Fully implement GET request from emotion dection to local host server in order to obtain the urls of the uploaded images
2.5 Upload images to remote server
2.6 Improve web page user friendliness and aesthetics
2.7 Implement flashcard functionalities of image and their emotion tag
