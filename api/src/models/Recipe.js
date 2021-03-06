const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/apps-recetas-cocina-aprender-esquire-recetas-vegetarianas-1522956381.jpg?crop=1xw:1xh;center,top&resize=980:*',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
    },
    steps: {
      type: DataTypes.TEXT,
    },
    createInDb: {
      //las recetas que guarde en DB, van a tener esta propiedad, por ende es mas facil encontrarlas
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: true, 
    },
  });
};
