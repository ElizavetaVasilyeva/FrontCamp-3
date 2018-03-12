**EPAM Frontcamp 3 (2017-2018)**
---------------------------
**Hometask 9 - React.js Part2**
**Mentor - Vladislav Kovaliov**
**Mentee - Lizaveta Vasilyeva**

Blog system web-server based on React.js + Redux + express framework + mongoose ORM was implemented.
Also in additional nodemon for development and
logging mechanism winston were used.

**Steps to establish:**

 1. Install dependencies for server through running commands:

	    npm install 
	  
 2. Install dependencies for client through running commands:
 
	    npm run client-install

 3. Restore backup data. Move files within folder db_backups to

	    ..\MongoDB\Server\3.6\bin\dump
    than run command

		mongorestore
    
 4. Run the client & server with concurrently

		npm run dev

 5.  Run the Express server only

		npm run server

 6. Run the React client only

	    npm run client

 7. Run tests on client

	    cd client
	    npm run test

 8. Server runs on http://localhost:5000 and client on http://localhost:3000
 9. Show log file **debug.log**

		

