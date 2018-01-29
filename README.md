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
	1) get 	all blogs

	    curl  http://localhost:8008/blogs
    
	2) get certain blog 	

	    curl  http://localhost:8008/blogs/1
	3) post new blog		

	    curl --data "author=Liza&context=Test blog" http://localhost:8008/blogs
    4) put blog   

		curl -X PUT -d "author=Liza&context=Test blog" http://localhost:8008/blogs/1
		
	5) delete blog

	      curl -X DELETE http://localhost:8008/blogs/1
	
		

