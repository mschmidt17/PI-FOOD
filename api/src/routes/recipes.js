const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { API_PI_KEY } = process.env;

const getInfoApiFood = async () => {
    let apiurl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PI_KEY}&addRecipeInformation=true&number=100`;

    const foodgetAll = await axios.get(apiurl);
    const apiInfo = foodgetAll.data.results.map((food) => {
        return {
            id: food.id,
            name: food.title,
            image: food.image,
            score: food.spoonacularScore,
            healthScore: food.healthScore,
            summary: food.summary,
            steps: food.analyzedInstructions[0]?.steps?.map((step) => step),
            diets: food.diets.map((diet) => diet),
            dishTypes: food.dishTypes.map((dish) => dish),
        };
    });
    return apiInfo;
};

const getInfoAPiDb = async () => {
    return await Recipe.findAll({
        include: {
        model: Diet,
        attributes: ['name'],
        through: {
            attributes: [],
        },
        },
    });
};

const getAllRecipeTotal = async () => {
    const infoapi = await getInfoApiFood();
    const infodb = await getInfoAPiDb();
    const infototal = infoapi.concat(infodb);
    return infototal;
};

router.get('/',async (req, res) => {
    const { name } = req.query;
    const allRecipes = await getAllRecipeTotal();
    try {
        if (name) {
            const filterNameQuery = allRecipes.filter((recipeName) =>
            recipeName.name.toLowerCase().includes(name.toLowerCase())
            );
            filterNameQuery.length
            ? res.status(200).send(filterNameQuery)
            : res
                .status(404)
                .send({ message: `Recipe with name: ${name} does not exist` });
        } else {
            res.status(200).send(allRecipes);
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allRecipes = await getAllRecipeTotal();
    try {
        if (id) {
            const filteredId = allRecipes.filter((recipeId) => recipeId.id == id);
            filteredId.length
            ? res.status(200).send(filteredId)
            : res
                .status(404)
                .send({ message: `Recipe with id: ${id} does not exist` });
        } else {
            res.status(404).send({ message: 'No matching id found ' });
        }
    } catch (err) {
      console.log(err);
    }
});


router.post('/', async (req, res) => {
    const { name, image, score, steps, healthScore, diets, summary } = req.body;
    try {
        let recipeCreate = await Recipe.create({
            name,
            image,
            score,
            summary,
            steps,
            healthScore,
        });
    
        let dietsDb = await Diet.findAll({
            where: {
            name: diets,
            },
        });
    
        recipeCreate.addDiet(dietsDb);
        res.status(200).send({ message: 'Diet Created Successfully' });
    } catch (err) {
      console.log(err);
    }
});

module.exports = router;