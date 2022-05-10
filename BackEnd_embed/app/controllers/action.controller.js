const Action = require('../models/Customer');

/* function actionList (cb){
    Action.find().lean().exec(function(err, actions){
        if (err) {
            cb(err);
        } else {
            cb(err, actions);
        }
    }) 
}


function actionGet (id, cb) {
    Action.findById(id).exec(function(err, action){
        
        if(err) {
            cb(err);
        } else {
            cb(null, action);
        }

    })
} */

function actionAdd(data, cb) {

    let newAction = new Action (data)
     
    console.log("data", data);

       newAction.save(function(err, action){

        if(err) {
            cb(err);
        } else {
            cb(null, action);
        }
 
        });
}

// function customerUpdate(id, data, cb) {
//     Customer.updateOne({_id: id}, data, function(err, customer) {
 
//         if(err) {
//             cb(err);
//         } else {
//             cb(null, customer);
//         }
 
//     });
// }

/* function actionDelete(id, cb) {
    Action.deleteOne({_id: id},function (err, action) {
        if (err) {
            cb(err);
        } else {
            cb(null, action);
        }
    });
} */

module.exports = {
    /* list: actionList,
    get: actionGet, */
    add: actionAdd,
    // update: actionUpdate,
    /* delete: actionDelete */
}