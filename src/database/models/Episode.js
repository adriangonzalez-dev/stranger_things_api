module.exports= (sequelize,dataTypes)=>{
    let alias= "Episode";
    let cols= {
        id:{
            type:dataTypes.INTEGER,
             primaryKey:true,
             autoIncrement: true,
             allowNull: false,

        },
        title:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        season_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        }
    }
let config= {
    tableName: "episodes",
    timestamps:false,
}

const Episode= sequelize.define(alias,cols,config);

Episode.associate=(models)=>{

    Episode.belongsToMany(models.Character,{
        as:"characters",
        through:"episode_character",
        foreignKey:"episode_id",
        otherKey:"character_id",
        timestamps:false
    })

    Episode.belongsTo(models.Season,{
        as:"season",
        foreignKey:"season_id"
    })
}
return Episode;
}