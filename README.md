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
	    

 2. Run application in dev mode:

		npm run dev

 3. Run application in prod mode:

		npm run prod

 4. Run in browser http://localhost:8008
 5. Show log file **debug.log**
 
 6. For creating POST, PUT and DELETE requests you are allowed to use Fiddler or Postman.
Ex:

    **POST** http://localhost:8008/blogs HTTP/1.1
    User-Agent: Fiddler
    Host: localhost:8008
    Content-Length: 47
    Content-Type: application/json
    Request body:
    {"author":"Liza", "context": "Test BLOG"}

cUrl:

    curl -k -i --raw -o 0.dat -X POST "http://localhost:8008/blogs" -H "User-Agent: Fiddler" -H "Host: localhost:8008" -H "Content-Type: application/json"

