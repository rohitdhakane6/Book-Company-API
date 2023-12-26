const mongoose=require('mongoose');

const publicationSchema=new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    books:[Number]
})

const Publication=mongoose.model('Publication',publicationSchema);

module.exports =Publication;