module.exports= (sequelize,dataTypes)=>{
    let alias= "Season";
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
        image:{
            type:dataTypes.STRING(250),
        }
    }
let config= {
    tableName: "seasons",
    timestamps:false,
}

const Season= sequelize.define(alias,cols,config);

Season.associate=(models)=>{
    Season.hasMany(models.Episode,{
        as:"episodes",
        foreignKey:"season_id"
    })
}
return Season;
}