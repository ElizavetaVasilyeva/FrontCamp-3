# MongoDB. Home Task 1

## 3. Querying Restaurants Collection 

### 3.1 How many “Chinese” (cuisine) restaurants are in “Queens” (borough)?

**Query**:  `db.restaurants.find({ cuisine: "Chinese", borough: "Queens" }).count()`

**Result**: *728*


### 3.2 What is the _id of the restaurant which has the grade with the highest ever score?

**Query**: `db.restaurants.find({},{_id: 1}).sort({"grades.score": -1}).limit(1)`

**Result**: `{ "_id" : ObjectId("5a5601ac9bc708ae48df953b") }`

###  3.3 Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough).

**Query**: 

     db.restaurants.update({borough:"Manhattan"},{$addToSet: { grades: {grade: "A", score: 7, date:
     ISODate()} }},{multi:true})

**Result**: `WriteResult({ "nMatched" : 10259, "nUpserted" : 0, "nModified" : 10259 })`

### 3.4 What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id.

**Query**:  `db.restaurants.find({"grades.8.score":{$lt:7}},{_id:0, name:1})`

**Result**: 

    { "name" : "Silver Krust West Indian Restaurant" }
    { "name" : "Pure Food" }


###  3.5 What are _id and borough of “Seafood” (cuisine) restaurants which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough.

**Query**:  

    db.restaurants.find({cuisine: "Seafood", grades: { $elemMatch: { date:
    { $gte:new ISODate("2014-02-01"),$lte:new ISODate("2014-03-01")}, grade: "B"}}}, {borough:1})

**Result**: 

    { "_id" : ObjectId("5a5601ad9bc708ae48dfc947"), "borough" : "Bronx" }
    { "_id" : ObjectId("5a5601ad9bc708ae48dfcbbf"), "borough" : "Manhattan" }

## 4. Indexing Restaurants Collection

### 4.1 Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan: `db.restaurants.find({ name: "Glorious Food" })`

**Query**: `db.restaurants.createIndex({ name: 1 })`

**Explain plan**: 

    db.restaurants.find({ name: "Glorious Food" }).explain()
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "name" : {
                                    "$eq" : "Glorious Food"
                            }
                    },
                    "winningPlan" : {
                            "stage" : "FETCH",
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "keyPattern" : {
                                            "name" : 1
                                    },
                                    "indexName" : "name_1",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "name" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : false,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "name" : [
                                                    "[\"Glorious Food\", \"Glorious Food\"]"
                                            ]
                                    }
                            }
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "EPBYMINW5077",
                    "port" : 27017,
                    "version" : "3.6.1",
                    "gitVersion" : "025d4f4fe61efd1fb6f0005be20cb45a004093d1"
            },
            "ok" : 1
    }

### 4.2 Drop index from task 4.1
**Query**: `db.restaurants.dropIndex({"name":1})`

**Result**: 

    db.restaurants.getIndexes()
    [
            {
                    "v" : 2,
                    "key" : {
                            "_id" : 1
                    },
                    "name" : "_id_",
                    "ns" : "frontcamp.restaurants"
            }
    ]

### 4.3 Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered: `db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })`

**Query**: `db.restaurants.createIndex({ restaurant_id: 1})`

**Explain plan**:

    db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 }).explain()
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "restaurant_id" : {
                                    "$eq" : "41098650"
                            }
                    },
                    "winningPlan" : {
                            "stage" : "PROJECTION",
                            "transformBy" : {
                                    "_id" : 0,
                                    "borough" : 1
                            },
                            "inputStage" : {
                                    "stage" : "FETCH",
                                    "inputStage" : {
                                            "stage" : "IXSCAN",
                                            "keyPattern" : {
                                                    "restaurant_id" : 1
                                            },
                                            "indexName" : "restaurant_id_1",
                                            "isMultiKey" : false,
                                            "multiKeyPaths" : {
                                                    "restaurant_id" : [ ]
                                            },
                                            "isUnique" : false,
                                            "isSparse" : false,
                                            "isPartial" : false,
                                            "indexVersion" : 2,
                                            "direction" : "forward",
                                            "indexBounds" : {
                                                    "restaurant_id" : [
                                                            "[\"41098650\", \"41098650\"]"
                                                    ]
                                            }
                                    }
                            }
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "EPBYMINW5077",
                    "port" : 27017,
                    "version" : "3.6.1",
                    "gitVersion" : "025d4f4fe61efd1fb6f0005be20cb45a004093d1"
            },
            "ok" : 1
    }

### 4.4 Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten Island”:

    db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index
    db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index
    db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index
**Query**: `db.restaurants.createIndex({cuisine: 1 },{ partialFilterExpression: { 'borough': { $eq: "Staten Island" } }})`

**Explain plan**:

    db.restaurants.find({ borough: "Staten Island", cuisine: "American" }).explain()
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "$and" : [
                                    {
                                            "borough" : {
                                                    "$eq" : "Staten Island"
                                            }
                                    },
                                    {
                                            "cuisine" : {
                                                    "$eq" : "American"
                                            }
                                    }
                            ]
                    },
                    "winningPlan" : {
                            "stage" : "FETCH",
                            "filter" : {
                                    "borough" : {
                                            "$eq" : "Staten Island"
                                    }
                            },
                            "inputStage" : {
                                    "stage" : "IXSCAN",
                                    "keyPattern" : {
                                            "cuisine" : 1
                                    },
                                    "indexName" : "cuisine_1",
                                    "isMultiKey" : false,
                                    "multiKeyPaths" : {
                                            "cuisine" : [ ]
                                    },
                                    "isUnique" : false,
                                    "isSparse" : false,
                                    "isPartial" : true,
                                    "indexVersion" : 2,
                                    "direction" : "forward",
                                    "indexBounds" : {
                                            "cuisine" : [
                                                    "[\"American\", \"American\"]"
                                            ]
                                    }
                            }
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "EPBYMINW5077",
                    "port" : 27017,
                    "version" : "3.6.1",
                    "gitVersion" : "025d4f4fe61efd1fb6f0005be20cb45a004093d1"
            },
            "ok" : 1
    }
**Explain plan 2**:

    db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }).explain()
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "$and" : [
                                    {
                                            "borough" : {
                                                    "$eq" : "Staten Island"
                                            }
                                    },
                                    {
                                            "name" : {
                                                    "$eq" : "Bagel Land"
                                            }
                                    }
                            ]
                    },
                    "winningPlan" : {
                            "stage" : "COLLSCAN",
                            "filter" : {
                                    "$and" : [
                                            {
                                                    "borough" : {
                                                            "$eq" : "Staten Island"
                                                    }
                                            },
                                            {
                                                    "name" : {
                                                            "$eq" : "Bagel Land"
                                                    }
                                            }
                                    ]
                            },
                            "direction" : "forward"
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "EPBYMINW5077",
                    "port" : 27017,
                    "version" : "3.6.1",
                    "gitVersion" : "025d4f4fe61efd1fb6f0005be20cb45a004093d1"
            },
            "ok" : 1
    }
**Explain plan 3**:

    db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }).explain()
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "$and" : [
                                    {
                                            "borough" : {
                                                    "$eq" : "Queens"
                                            }
                                    },
                                    {
                                            "cuisine" : {
                                                    "$eq" : "Pizza"
                                            }
                                    }
                            ]
                    },
                    "winningPlan" : {
                            "stage" : "COLLSCAN",
                            "filter" : {
                                    "$and" : [
                                            {
                                                    "borough" : {
                                                            "$eq" : "Queens"
                                                    }
                                            },
                                            {
                                                    "cuisine" : {
                                                            "$eq" : "Pizza"
                                                    }
                                            }
                                    ]
                            },
                            "direction" : "forward"
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "EPBYMINW5077",
                    "port" : 27017,
                    "version" : "3.6.1",
                    "gitVersion" : "025d4f4fe61efd1fb6f0005be20cb45a004093d1"
            },
            "ok" : 1
    }

### 4.5 Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered

**Query**: `db.restaurants.createIndex({"grades.8.score": 1}, {sparse:true})`

**Explain plan**:

    db.restaurants.find({"grades.8.score":{$lt:7}},{_id:0, name:1}).explain()
    {
            "queryPlanner" : {
                    "plannerVersion" : 1,
                    "namespace" : "frontcamp.restaurants",
                    "indexFilterSet" : false,
                    "parsedQuery" : {
                            "grades.8.score" : {
                                    "$lt" : 7
                            }
                    },
                    "winningPlan" : {
                            "stage" : "PROJECTION",
                            "transformBy" : {
                                    "_id" : 0,
                                    "name" : 1
                            },
                            "inputStage" : {
                                    "stage" : "FETCH",
                                    "inputStage" : {
                                            "stage" : "IXSCAN",
                                            "keyPattern" : {
                                                    "grades.8.score" : 1
                                            },
                                            "indexName" : "grades.8.score_1",
                                            "isMultiKey" : true,
                                            "multiKeyPaths" : {
                                                    "grades.8.score" : [
                                                            "grades"
                                                    ]
                                            },
                                            "isUnique" : false,
                                            "isSparse" : true,
                                            "isPartial" : false,
                                            "indexVersion" : 2,
                                            "direction" : "forward",
                                            "indexBounds" : {
                                                    "grades.8.score" : [
                                                            "[-inf.0, 7.0)"
                                                    ]
                                            }
                                    }
                            }
                    },
                    "rejectedPlans" : [ ]
            },
            "serverInfo" : {
                    "host" : "EPBYMINW5077",
                    "port" : 27017,
                    "version" : "3.6.1",
                    "gitVersion" : "025d4f4fe61efd1fb6f0005be20cb45a004093d1"
            },
            "ok" : 1
    }

