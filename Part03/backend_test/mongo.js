const mongoose = require('mongoose')
const arg_len = process.argv.length
const pw = process.argv[2]
const url = `mongodb+srv://dee:${pw}@fsopen.k7gkxk8.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fsopen`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})
const Note = mongoose.model('Note', noteSchema)

if (arg_len === 5){
    // For adding a doc
    const note = new Note({
        content: 'HTML is not easy',
        important: true,
    })
    note.save().then(result => {
    console.log(`added note ${result}`)
    mongoose.connection.close()
    })
}else if (arg_len < 5){
    console.log('partial query')
    process.exit(1)
}else if (arg_len ===3){
    // // For fetching a doc - no param "{}" means select all
    Note.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}else if (arg_len < 3) {
    console.log('give pw as argument')
    process.exit(1)
}else{
    console.log('Too many arguments')
    process.exit(1)
}
// // select one 
// Note.find({important: true}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })