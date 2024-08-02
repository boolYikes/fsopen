const mongoose = require('mongoose')
const arg_len = process.argv.length
if (arg_len < 3 || arg_len > 5){
    console.log("Invalid number of arguments")
    process.exit(1)
}else{
    const pw = process.argv[2]
    const url = `mongodb+srv://Dee:${pw}@cluster0.2rbi5vk.mongodb.net/ybApp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.set('strictQuery', false)
    mongoose.connect(url)
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })
    const Person = mongoose.model('Person', personSchema)
    if (arg_len === 5){
        console.log("Insert")
        const person = new Person({
            name: `${process.argv[3]}`,
            number: `${process.argv[4]}`
        })
        person.save().then(result => {
            console.log(`added ${result.name}, number ${result.number} to yellow book`)
            mongoose.connection.close()
        })
    }else if (arg_len === 4){
        console.log("Select one")
        Person.find({name:process.argv[3]}).then(result => {
            result.forEach(person => { // It's still wrapped in an array?
                console.log(`Fetched person ${person.name}, number ${person.number}`)
            })
            mongoose.connection.close()
        })
    }else if (arg_len === 3){
        console.log("Select all:")
        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(`${person.name}, ${person.number}`)
            })
            mongoose.connection.close()
        })        
    }
}