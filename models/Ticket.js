var mongoose = require('mongoose');


var Schema = mongoose.Schema;

// var TicketSchema = new Schema(
//   {
//     createTime: String,
//     status: {type: String, required: true},
//     subject: {type: String, required: true},
//     admin: {type: Schema.Types.ObjectId, ref: 'Admin', required: true},
//     description: {type: String, required: true},
//     type: {type: String, required: true},
//     user: [{type: Schema.Types.ObjectId, ref: 'User'}]
//   }
// );
// var TicketSchema = new mongoose.Schema({
//   isbn: {
//     type:String,
//     required:true
//   },
//   title: {
//     type: String,
//     required:true
//   },
//   author: {
//     type: String,
//     required:true
//   },
//   description:{
//     type: String,
//     required:true
//   },
//   completed:{
//     type:Boolean
//   },
//   published_date: { type: Date },
//   publisher: String,
//   updated_date: { type: Date, default: Date.now },
//   status: {type: String, default: 'New'},
//   owner: {
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User" //same name as User in User.js model
//   },
//   Admin: {
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User" //same name as User in User.js model
//   },

// });

var TicketSchema = new mongoose.Schema({
    title: {
      type: String,
      required:true
    },
    category:{
      type: String,
      required:true
    },
    description:{
      type: String,
      required:true
    },
    author: {
    type: String,
    
  },
    created_date: { type: Date, default: Date.now },
    status: {type: String, default: 'New'},
    owner: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"users" //same name as User in User.js model
    },
    admin: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"admins" //same name as Admin in Admin.js model
    },
    image: {
      type: String
    },
    imageContentType: String,
    imageTitle: String,


  });

  TicketSchema.virtual('date').get(function() {
    const date =  new Intl.DateTimeFormat('en-GB', { 
        year: 'numeric', 
        month: 'long', 
        day: '2-digit' 
    }).format(customer.firstSale)

    return {date};

    
  })
  
/* // Virtual for book's URL
TicketSchema
.virtual('url')
.get(function () {
  return '/tickets/' + this._id;
});
 */
//Export model
module.exports = mongoose.model('Ticket', TicketSchema);