const db = require('../models')

async function seed() {
    //get the place, H-Thai-ML
    let place =  await db.Place.findOne({ name: 'H-Thai-ML' })

    let comment = await db.Comment.create({
        author: 'Famished Fran',
        rant: false,
        stars: 5.0,
        content: "Wow, simply amazing! Highly recommended!"
    })
    //add that comment to the place's comment array
    place.comments.push(comment.id)

    //save the place now that it has comment
    await place.save()

    //exit the program
    process.exit()
}
seed()