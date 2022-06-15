const { Router } = require('express');
const router = Router();
const { Recipe, Diet } = require('../db.js');
const axios = require('axios');
const { API_PI_KEY } = process.env;

const getInfoApiFood = async () => {
    let apiurl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PI_KEY}&addRecipeInformation=true&number=100`;

    const foodgetAll = await axios.get(apiurl);
    const apiInfo = foodgetAll.data.results.map((e) => {
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            dishTypes: e.dishTypes?.map((d) => { return { name: d } }),    //es un arreglo, mapeo para que me devuelva un array de objetos
            diets: e.diets.map((d) => d),      //es un arreglo, mapeo para que me devuelva un array de objetos
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions
        };
    });
    return apiInfo;
};

const getInfoAPiDb = async () => {
    const infoDatabase = await Recipe.findAll({
        include: {
            model: Diet,
        },
    });
    const mapInfoDb = infoDatabase?.map((r) => {
        return {
            id: r.id,
            name: r.name,
            image: r.image,
            diets: r.diets?.map((d) => d.name),
            dishTypes: r.dishTypes?.map((d) => d.name),
            summary: r.summary,
            healthScore: r.healthScore,
            steps: r.analyzedInstructions,
        };
    });
    return mapInfoDb;
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
    const { name, image, score, steps, healthScore, diets, summary } = req.body;        //Guarda lo que el usuario completo en el formulario 
    try {
        let recipeCreate = await Recipe.create({
            name,
            image,
            score,
            summary,
            steps,
            healthScore,
        });
    
        let dietsDb = await Diet.findAll({                                             //espera que se cree una dieta con los datos capturados en mi BD
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