const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const imageschema=new Schema({
    url: String,
    filename:String
});

imageschema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_100');
})

const opts={toJSON: {virtuals: true}};
const CampgroundSchema = new Schema({
    title: String,
    images: [imageschema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    const camp={
       id :this._id,
       title :this.title,
       price :this.price,
       desc : this.description.substring(0,20)}
    return  camp;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);