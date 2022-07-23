module.exports= (sequelize,dataTypes)=>{
    let alias= "Genre";
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
        }
    }
let config= {
    tableName: "genres",
    timestamps:false,
}

const Genre= sequelize.define(alias,cols,config);

Genre.associate=(models)=>{

    Genre.belongsTo(models.Character,{
        as:"characters",
        foreignKey:"genre_id"
    })
}
return Genre;
}