"use strict";

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


// completely resets your database.
// really bad idea irl, but useful for testing


router.route("/")
    .post((req, res) => {
        console.log(`POST /`);

        const payload = `{
            search(term:"restaurant",
              latitude:${req.body.latitude},
              longitude:${req.body.longitude},
                   radius:1609) {
              total
              business {
                  price
                url
                name
                location {
                    address1
                }
                categories {
                    title
                }
                reviews {
                  text
                  rating
                  time_created
                  url
                }
              }
            }
          }`

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/graphql', 'Authorization': 'Bearer LL7utKGyZOsd7g1xdwfMyFEh80UCmesfPzQ5pfd6VeBexSbUbyRkBuGswVcMsqPFxNGYe7u63HIQWwpoKZuJFWM759wh6RwZZLLZYGEMbFyesMJrugHWrH4_YDdwYXYx', 'Origin': '', 'Accept-Language': 'en_US' },
            body: payload
        }

        fetch('https://api.yelp.com/v3/graphql', requestOptions)
            .then(response => response.json())
            .then(data => {
                // setApiData(data);
                // setLoading(false);
                res.status(200).send(data)
            });

    });

module.exports = router;