**EPAM Frontcamp 3 (2017)**
---------------------------
**Hometask 7 - Node.js/Express.js** 
**Mentee - Vladislav Kovaliov**

Blog system web-server based on Node.js + express framework was implemented.
Also in additional nodemon for development and
logging mechanism winston were used.
 

**Steps to establish:**

 1. Install devDependencies through running commands:

	    npm install 
	    

 2. Run application:

		npm run start

 3. Run in browser http://localhost:8008
 4. Show log file **debug.log**
 
 5. For creating POST, PUT and DELETE requests you are allowed to use Fiddler or Postman.
Ex:

    **POST** http://localhost:8008/blogs HTTP/1.1
    User-Agent: Fiddler
    Host: localhost:8008
    Content-Length: 47
    Content-Type: application/json
    Request body:
    {"author":"Liza", "context": "Test BLOG"}