module.exports= (sequelize,dataTypes)=>{
    let alias= "Character";
    let cols= {
        id:{
            type:dataTypes.INTEGER,
             primaryKey:true,
             autoIncrement: true,
             allowNull: false,

        },
        name:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        birth:{
            type:dataTypes.INTEGER
        },
        alias:{
            type:dataTypes.STRING(100)
        },
        ocupation:{
            type:dataTypes.STRING(100)
        },
        actor:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        history:{
            type:dataTypes.TEXT,
            allowNull:false,
        },
        genre_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        species_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        },
        location_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        }
    }
let config= {
    tableName: "characters_",
    timestamps:false,
}

const Character= sequelize.define(alias,cols,config);

Character.associate=(models)=>{
    Character.belongsTo(models.Specie,{
        as:"species",
        foreignKey:"species_id"
    })

    Character.belongsTo(models.Genre,{
        as:"genres",
        foreignKey:"genre_id"
    })

    Character.belongsTo(models.Location,{
        as:"location",
        foreignKey:"location_id"
    })

    Character.hasMany(models.Image,{
        as:"images",
        foreignKey:"character_id"
    })

    Character.belongsToMany(models.Episode,{
        as:"episodes",
        through:"episode_character",
        foreignKey:"character_id",
        otherKey:"episode_id",
        timestamps:false
    })
}
return Character;
}