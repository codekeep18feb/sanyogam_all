curl -X GET "http://localhost:8000/api/users" -H "accept: application/json"

curl -X GET "http://localhost:8000/api/users/query?lname=Singh" -H "accept: application/json"



curl -X POST "http://localhost:8000/api/users" -H "accept: application/json" -H "Content-Type: application/json" -d '{"fname":"John","lname":"Doe"}'



curl -X GET "http://localhost:8000/api/users" -H "accept: application/json"
[
  {
    "fname": "Tooth",
    "lname": "Fairy",
    "timestamp": "2023-08-13 14:57:12"
  },
  {
    "fname": "Knecht",
    "lname": "Ruprecht",
    "timestamp": "2023-08-13 14:57:12"
  },
  {
    "fname": "Easter",
    "lname": "Bunny",
    "timestamp": "2023-08-13 14:57:12"
  },
  {
    "fname": "John",
    "lname": "Doe",
    "timestamp": "2023-08-13 14:58:24"
  }
]


    