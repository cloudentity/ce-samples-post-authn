#!/bin/bash

echo ----- GET all
curl -i -k https://localhost:8443/api/users/test+corp@cloudentity.com
echo

echo ----- GET by ID
curl -i -k https://localhost:8443/api/users/test+acme@cloudentity.com
echo

