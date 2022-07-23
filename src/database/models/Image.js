module.exports= (sequelize,dataTypes)=>{
    let alias= "Image";
    let cols= {
        id:{
            type:dataTypes.INTEGER,
             primaryKey:true,
             autoIncrement: true,
             allowNull: false,

        },
        title:{
            type:dataTypes.STRING(250),
            allowNull:false,
        },
        public_id:{
            type:dataTypes.STRING(200),
        },
        character_id:{
            type:dataTypes.INTEGER,
            allowNull:false
        }
    }
let config= {
    tableName: "images",
    timestamps:false,
}

const Image= sequelize.define(alias,cols,config);

Image.associate=(models)=>{

    Image.hasMany(models.Character,{
        as:"characters",
        foreignKey:"character_id"
    })
}
return Image;
}