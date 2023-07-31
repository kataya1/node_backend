#!/bin/bash

# Simple GET requests
echo "GET http://localhost:3000/"
curl http://localhost:3000/
echo
echo

echo "GET http://localhost:3000/users"
curl http://localhost:3000/users 
echo
echo

echo "GET http://localhost:3000/nonexistantroute"
curl http://localhost:3000/nonexistantroute 
echo
echo


# POST request
echo "POST http://localhost:3000/users"  
curl -X POST http://localhost:3000/users
echo 
echo

# Route parameters
echo "GET http://localhost:3000/users/123/posts/456"
curl http://localhost:3000/users/123/posts/456
echo
echo  

# POST NOT FOUND  
echo "POST http://localhost:3000/users/1/posts/499"
curl http://localhost:3000/users/1/posts/499
echo
echo

# Route parameters
echo "GET http://localhost:3000/users/1/posts/2"
curl http://localhost:3000/users/1/posts/2
echo
echo

# Error routes
echo "GET http://localhost:3000/error1"
curl http://localhost:3000/error1
echo
echo

echo "GET http://localhost:3000/error2" 
curl http://localhost:3000/error2
echo
echo

echo "POST http://localhost:3000/error2"
curl -iX POST \
  http://localhost:3000/error2 \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Error occurred"
  }'  
echo
echo
