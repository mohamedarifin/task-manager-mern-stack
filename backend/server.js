// // const express = require('express')
// // const mongoose = require('mongoose')
// // const dotenv = require('dotenv')
// // const cors = require('cors')
// // const bodyParser = require('body-parser')
// // const Route = require('./routes');

// // const app = express();

// // dotenv.config();
// // app.use(cors());
// // app.use(express.json());
// // app.use(bodyParser.urlencoded());

// // mongoose.connect(process.env.DATABASE_URL).then(() => {
// // }).catch((err) => {
// // })

// // app.use(Route);

// // app.get('/', (req, res) => {
// //     res.send('welcome to our Serverss');
// // })

// // app.listen(process.env.PORT, () => {
// // })

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const Route = require('./routes');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(Route);

// app.get('/', (req, res) => {
//     res.send('welcome to our Serverss');
// });

// const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.DATABASE_URL)
//     .then(() => {
//         console.log('MongoDB connected successfully');

//         app.listen(PORT, '0.0.0.0', () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error('MongoDB connection failed:', err);
//     });



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('./routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(Route);

app.get('/', (req, res) => {
    res.send('welcome to our Serverss');
});

// Render provides the PORT automatically
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    });
