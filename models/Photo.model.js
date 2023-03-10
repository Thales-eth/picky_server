const { Schema, model } = require("mongoose")

const photoSchema = new Schema(
    {
        url: {
            type: String
        },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Photo = model("Photo", photoSchema)

module.exports = Photo
