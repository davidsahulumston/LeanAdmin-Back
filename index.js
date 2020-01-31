const express = require('express');
const app = express();
const cors = require('cors');


const {config} = require('./config/index');
const usersApi = require('./routes/users');
const companyApi = require('./routes/company');
const clientApi = require('./routes/clients');
const roleApi = require('./routes/roles');
const projectApi = require('./routes/projects');
const positionApi = require('./routes/positions');




app.use(cors());
app.use(express.json());




usersApi(app);
companyApi(app);
clientApi(app);
roleApi(app);
projectApi(app);
positionApi(app);

app.listen(config.port, function() {
    console.log(`listening http://localhost:${config.port}`);
})