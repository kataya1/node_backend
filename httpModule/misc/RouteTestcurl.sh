#!/bin/bash

# Simple GET requests 
curl http://localhost:3000/
echo

curl http://localhost:3000/users
echo


# POST request 
curl -X POST http://localhost:3000/users 
echo


# Route parameters
curl http://localhost:3000/users/123/posts/456
echo

# POST NOT FOUND
curl http://localhost:3000/users/1/posts/499
echo

# Route parameters
curl http://localhost:3000/users/1/posts/2
echo


# Error routes
curl http://localhost:3000/error1
echo

curl http://localhost:3000/error2
echo

curl -iX POST \
  http://localhost:3000/error2 \
  -H 'Content-Type: application/json' \
  -d '{
    "message": "Error occurred"
  }'
