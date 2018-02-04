**EPAM Frontcamp 3 (2017-2018)**
---------------------------
**Hometask 8 - Node.js/Express.js Part2**
**Mentor - Vladislav Kovaliov**
**Mentee - Lizaveta Vasilyeva**

Blog system web-server based on Node.js + express framework + mongoose ORM was implemented.
Also in additional nodemon for development and
logging mechanism winston were used.
User registration, authorization and authentication were implemented in advanced through the passportjs . 

**Steps to establish:**

 1. Install devDependencies through running commands:

	    npm install 
	    
 
 2. Restore backup data. Move files within folder db_backups to

	    C:\Program Files\MongoDB\Server\3.6\bin\dump
    than run command

		mongorestore
    
 3. Run application in dev mode:

		npm run dev

 4. Run application in prod mode:

		npm run prod

 5. Run in browser http://localhost:8008
 6. Show log file **debug.log**

		

