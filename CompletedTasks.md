## **MongoDB. Home Task 2**

### **Aggregating Airlines Collection** 

#### **1. How many records does each airline class have? Use $project to show result as** `{ class: "Z", total: 999 }`

**Query**:  

    db.airlines.aggregate([
        {
            $group: { 
                _id: "$class",
                 total: { $sum: 1 }
             }
        },
        { 
            $project: { 
                _id: 0, 
                class: "$_id",
                total: "$total" 
            }
        }
    ])


**Result**: 

    { "class" : "F", "total" : 140343 }
    { "class" : "L", "total" : 23123 }
    { "class" : "P", "total" : 5683 }
    { "class" : "G", "total" : 17499 }

#### **2. What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as** `{ "avgPassengers" : 2312.380, "city" : "Minsk, Belarus" }`

**Query**: 

    db.airlines.aggregate([
    	{
           $match: {
    		   destCountry: { $ne: "United States" }    
    		}
    	},
    	{
    		$group: {
    			_id: "$destCity",
    			avgPassangers: { $avg: "$passengers" }
    		}		
    	},
    	{
    		$sort: { avgPassangers: -1 }
    	},
    	{ 
    		$limit: 3
    	},
    	{ 
            $project: {
    			_id: 0,
    			avgPassangers: "$avgPassangers",
                city: "$_id"
    		}
    	}
    ])


**Result**: 

    { "avgPassangers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
    { "avgPassangers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
    { "avgPassangers" : 7103.333333333333, "city" : "Guangzhou, China" }


#### **3. Which carriers provide flights to Latvia (destCountry)? Show result as one document **`{ "_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }`

**Query**: 

    db.airlines.aggregate([
    	{
           $match: {
    		   destCountry: { $eq: "Latvia" }    
    		}
    	},
    	{
    		$group: {
    			_id: "$destCountry",
    			carriers: {  $addToSet: "$carrier" }
    		}		
    	}
    ])


**Result**: 

    { "_id" : "Latvia", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }

#### **4. What are the carriers which flue the most number of passengers from the United State to either Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the first 3). Show result as** `{ "_id" : "<carrier>", "total" : 999}`

**Query**:  

    db.airlines.aggregate([
    	{
           $match: {
    		   originCountry : { $eq: "United States" } ,
    		   destCountry: { $in: ["Greece", "Italy", "Spain"] }    
    		}
    	},
    	{
    		$group: {
    			_id: "$carrier",
    			total: {  $sum: "$passengers" }
    		}		
    	},
    	{
    		$sort: { total: -1 }
    	},
    	{ 
    		$limit: 10
    	},
    	{ 
    		$skip: 3
    	}
    ])


**Result**: 

    { "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
    { "_id" : "United Air Lines Inc.", "total" : 229936 }
    { "_id" : "Emirates", "total" : 100903 }
    { "_id" : "Air Europa", "total" : 94968 }
    { "_id" : "Meridiana S.p.A", "total" : 20308 }
    { "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
    { "_id" : "VistaJet Limited", "total" : 183 }


#### **5. Find the city (originCity) with the highest sum of passengers for each state (originState) of the United States (originCountry). Provide the city for the first 5 states ordered by state alphabetically (you should see the city for Alaska, Arizona and etc). Show result as** `{ "totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz" } }`

**Query**:  

    db.airlines.aggregate([
    	{
           $match: {
    			originCountry: "United States"		
    		}
    	},
    	{
    		$group: {
    			_id: { 
    				originState: "$originState",
    				originCity: "$originCity"
    			},
    			totalPassengers: { $sum: "$passengers"}
    		}		
    	},
    	{
    		$sort: { totalPassengers: -1 }
    	},
    	{
    		$group: {
    			_id: "$_id.originState",
    			city: { $first: "$_id.originCity" },
    			totalPassengers: { $first: "$totalPassengers"}
    		}		
    	},
    	{
    		$sort: { _id: 1}
    	},
    	{ $limit: 5	},
    	{
    		$project:{
    			_id:0,
    			totalPassengers: "$totalPassengers",
    			location: {
    				state: "$_id",
    				city: "$city"
    				}
    		}
    	}
    ])


**Result**: 

    { "totalPassengers" : 760120, "location" : { "state" : "Alabama", "city" : "Birmingham, AL" } }
    { "totalPassengers" : 1472404, "location" : { "state" : "Alaska", "city" : "Anchorage, AK" } }
    { "totalPassengers" : 13152753, "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" } }
    { "totalPassengers" : 571452, "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" } }
    { "totalPassengers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }


### **Aggregate Enron Collection**

#### **Inspect a few of the documents to get a basic understanding of the structure. Enron was an American corporation that engaged in a widespread accounting fraud and subsequently failed. In this dataset, each document is an email message. Like all Email messages, there is one sender but there can be multiple recipients.**
#### **For this task you will use the aggregation framework to figure out pairs of people that tend to communicate a lot. To do this, you will need to unwind the To list for each message.**
#### **This problem is a little tricky because a recipient may appear more than once in the To list for a message. You will need to fix that in a stage of the aggregation before doing your grouping and counting of (sender, recipient) pairs.**
#### **Which pair of people have the greatest number of messages in the dataset?**
#### **For you reference the number of messages from phillip.love@enron.co to sladana-anna.kulic@enron.com is 144.**

**Query**: 

    db.enron.aggregate([
    	{ $unwind : "$headers.To" },
    	{	
    		$group: {
    			_id: "$_id",
    			from: {$first: "$headers.From"},
    			to: {$addToSet: "$headers.To"}
    		}		
    	},
    	{ $unwind : "$to" },
    	{	
    		$group: {
    			_id: {
    				from: "$from",
    				to: "$to"
    			},
    			countMes: {$sum: 1}
    		}		
    	},
    	{
    		$sort: {countMes: -1}
    	}
    ])

**Result**: 

    { "_id" : { "from" : "susan.mara@enron.com", "to" : "jeff.dasovich@enron.com" }, "countMes" : 750 }