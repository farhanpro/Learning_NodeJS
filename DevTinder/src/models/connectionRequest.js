const mongoose = require('mongoose');
const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{type:mongoose.Schema.Types.ObjectId,required:true},

    toUserId:{type:mongoose.Schema.Types.ObjectId,required:true},

    status:{
        type:String,
        enum:
        {
            values:['ignored','interested','accepted','rejected'],
            message:`{VALUE} is incorrect status type`
        },
        required:true
    },
},{timestamps:true}
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
// Mongoose 9 no longer passes next() to pre middleware — throw or return a promise instead.
connectionRequestSchema.pre('save', function () {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You cannot send connection request to yourself");
    }
});
const ConnectionRequestModel = mongoose.model('ConnectionRequest',connectionRequestSchema);

module.exports = ConnectionRequestModel;