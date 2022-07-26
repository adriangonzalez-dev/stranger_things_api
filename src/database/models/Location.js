module.exports= (sequelize,dataTypes)=>{
    let alias= "Location";
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
    tableName: "location",
    timestamps:false,
}

const Location= sequelize.define(alias,cols,config);

Location.associate=(models)=>{

    Location.belongsTo(models.Character,{
        as:"location",
        foreignKey:"location_id"
    })
}
return Location;
}