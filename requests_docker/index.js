const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Requests = require("./models/models.js")
const RequestsDB = require("./db")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

RequestsDB.on('error', console.error.bind(console, 'MongoDB connection error:'));
const apiPort = 4000;


app.post("/requests" , async (req, res) => {
    try {
        const { book_id, user_id , book_name, user_name} = req.body;
        const newRequest = new Requests({
            book_id,
            book_name,
            user_id,
            user_name,
        });
        await newRequest.save();
        return res.status(200).send('Book request created successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
});


app.get("/requests/pending", async (req, res) => {
    try {
        const pendingRequests = await Requests.find({ request: 'pending' });
        return res.status(200).json(pendingRequests);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error retrieving book requests');
    }
});

app.put('/requests/:id/accepted', async (req, res) => {
    const requestId = req.params.id;
    try {
        await Requests.findByIdAndUpdate(requestId, { request: 'accepted' });

        return res.status(200).send('Book request accepted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error updating book request');
    }
});

app.put('/requests/:id/declined', async (req, res) => {
    const requestId = req.params.id;
    try {
        await Requests.findByIdAndUpdate(requestId, { request: 'declined' });

        return res.status(200).send('Book request declined successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error updating book request');
    }
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));