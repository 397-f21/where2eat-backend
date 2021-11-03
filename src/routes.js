"use strict";

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config()


// completely resets your database.
// really bad idea irl, but useful for testing


router.route("/")
  .post((req, res) => {
    console.log(`POST /`);

    const payload = `{
            search(term:"restaurant",
              limit: 50,
              latitude:${req.body.latitude},
              longitude:${req.body.longitude},
              radius:${req.body.radius},
              open_now: true,
              sort_by: "rating",
              attributes: ["${req.body.attribute}"]) {
              total
              business {
                photos
                distance
                rating
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
      headers: { 'Content-Type': 'application/graphql', 'Authorization': `Bearer ${process.env.API_KEY}`, 'Origin': '', 'Accept-Language': 'en_US' },
      body: payload
    }

    fetch('https://api.yelp.com/v3/graphql', requestOptions)
      .then(response => response.json())
      .then(data => {
        res.status(200).send(data)
      });

  });

module.exports = router;