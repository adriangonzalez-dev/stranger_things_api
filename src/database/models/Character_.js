module.exports= (sequelize,dataTypes)  =>{
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
    Character.hasMany(models.images,{
        as:"images",
        foreignKey:"product_id"
    })

    Character.hasMany(models.ingredients,{
        as:"ingredients",
        foreignKey:"product_id"
    })

    Character.belongsToMany(models.categories,{
        as:"categories",
        through:"product_category",
        foreignKey:"product_id",
        otherKey:"category_id",
        timestamps:false
    })

    Character.belongsToMany(models.orders,{
        as:"orders",
        through:"orders_product",
        foreignKey:"product_id",
        otherKey:"order_id",
        createdAt:"created_at",
        updatedAt:false,
        deletedAt:false
    })
}
return Character;
}