#!/bin/bash

node cityToCoords.js
topojson -o ../dist/assets/data/world.json  --id-property su_a3 --properties name,localname,country -- countries.json cities.json trips.json
