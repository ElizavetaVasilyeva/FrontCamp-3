**EPAM Frontcamp 3 (2017-2018)**
---------------------------
**Hometask 12 - Unit Tests**
**Mentor - Vladislav Kovaliov**
**Mentee - Lizaveta Vasilyeva**

Blogs App based on AngularJS + express framework + mongoose ORM was covered with unit tests through the follow frameworks:

 - Mocha 
 - Chai 
 - Karma 
 - Jasmine
 - in additional: attempts working with stryker
 
**Steps to establish:**

 - Install dependencies through running commands:

	    npm install 

 - Restore backup data. Move files within folder db_backups to

	    ..\MongoDB\Server\3.6\bin\dump
    than run command

		mongorestore

 -  Run app

		npm run start
    
 - App runs on http://localhost:5000 

 - Show log file **debug.log**
 - Run tests 

	     npm run test

 - Run coverage on server (coverage on client are included in karma config by default)

	     npm run coverage_server
	     
   See result in folders coverage both on client and server

 - Install mutator project

	    npm run calculator-install

 - Run stryker

	    npm run stryker

		

