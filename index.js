const express = require('express');

const users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

const app = express();
app.get('/myResource', (req,res) => {
    return res.json({
        key: 'value'
    })
})
// get the resource specified in the url
app.get('/myResource/:id', (req,res) => {
   return res.json({selectedKey: req.params.id}); 
});

//get all users
app.get('/users', (req,res) => {
    return res.json(users);
});

//get one user specified by id
app.get('/users/:id', (req,res) => {
    return res.json(users[req.params.id]);
});

//create a new user
app.post('/users', (req,res) => {
    const newUser = req.body;
    newUser.id = Math.random().toString();
    users[newUser.id] = newUser;
    return res.json(newUser);
});

//get all messages
app.get('/messages', (req,res) => {
    return res.json(messages);
});

//get one message specified by id
app.get('/messages/:id', (req,res) => {
    return res.json(messages[req.params.id]);
});

//get all messages for one user
app.get('/messages/user/:userId', (req,res) => {
    const userMessages = Object.values(messages).filter(message => message.userId === req.params.userId);
    return res.json(userMessages);
});

//create a new message defined by userId
app.post('/messages/user/:userId', (req,res) => {
    const newMessage = req.body;
    newMessage.id = Math.random().toString();
    newMessage.userId = req.params.userId;
    messages[newMessage.id] = newMessage;
    return res.json(newMessage);
});

app.listen(3000, () => console.log('Server is running on port 3000'));