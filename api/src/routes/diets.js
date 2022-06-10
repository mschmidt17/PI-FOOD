const { Router } = require('express');
const { Diet } = require('../db.js');
const router = Router();

router.get('/', async (req, res) => {
    const diets = [
        'gluten free',
        'dairy free',
        'paleolithic',
        'ketogenic',
        'lacto ovo vegetarian',
        'vegan',
        'pescatarian',
        'primal',
        'fodmap friendly',
        'whole 30',
    ];

    try {
        diets.forEach((diet) => {
            Diet.findOrCreate({
            where: {
                name: diet,
            },
            });
        });
    
        const allDiets = await Diet.findAll();
        res.status(200).send(allDiets);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;