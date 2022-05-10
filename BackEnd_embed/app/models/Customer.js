const mongoose = require("mongoose");


mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, {useNewUrlParser: true, useUnifiedTopology: true})

 const schemaAction = new mongoose.Schema({
    date: { type: Date, default: Date.now, /* required: true */ },
    action_type: String,
    // action_type: {
    //     phone: { type: Boolean, /* required: true */ },
    //     meeting: { type: Boolean, /* required: true */ },
    //     another: { type: String }
    // },
    action_description: { type: String, required: true },
}); 



const schemaCustomer = new mongoose.Schema({
    name: { type: String, /* required: true */ },
    address: {
        street: { type: String, /* required: true */ },
        city: { type: String, /* required: true */ },
        zipcode: { type: String, /* required: true */ },
    },
    nip: String,
    actions: [schemaAction]  
});

// module.exports = mongoose.model('Action', schemaAction)
module.exports = mongoose.model('Customer', schemaCustomer);

    
/*  module.exports.Action = mongoose.model('Action', schemaAction);
    module.exports.Customer = mongoose.model('Customer', schemaCustomer); */

    /* module.exports = {
        action: mongoose.model('Action', schemaAction),
        customer: mongoose.model('Customer', schemaCustomer)
    } */


