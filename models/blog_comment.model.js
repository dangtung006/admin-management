const { Schema , Types, initModel } = require("../util/orm-helper")();

const BlogCommentSchema = new Schema({
    blogId         : { type : Number},
    count          : { type : Number, require : true},
    comments       : { type : Array, default : [
        {
            commentId: { type: Number, required: true},
            userId: { type: Number, required: true},
            email: { type: String, default: ''},
            body: { type: String, default: ''},
            name: { type: String, default: ''},
        }
    ]},

    created_at     : { type : Date, default: Date.now },
    updated_at     : { type : Date, default: Date.now },
    deleted_at     : { type : Date, default: null }
});

module.exports = initModel('blog_comments', BlogCommentSchema);