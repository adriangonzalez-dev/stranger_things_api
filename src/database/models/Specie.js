module.exports= (sequelize,dataTypes)=>{
    let alias= "Specie";
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
    tableName: "species",
    timestamps:false,
}

const Specie= sequelize.define(alias,cols,config);

Specie.associate=(models)=>{
    Specie.belongsTo(models.Character,{
        as:"characters",
        foreignKey:"species_id"
    })
}
return Specie;
}