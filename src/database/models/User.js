module.exports= (sequelize,dataTypes)=>{
    let alias= "User";
    let cols= {
        id:{
            type:dataTypes.INTEGER,
             primaryKey:true,
             autoIncrement: true,
             allowNull: false,

        },
        username:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        email:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        pass:{
            type:dataTypes.STRING(100),
            allowNull:false,
        },
        avatar:{
            type:dataTypes.STRING(250),
            allowNull:false,
        },
        public_id:{
            type:dataTypes.STRING(100),
        },
    }
let config= {
    tableName: "users",
    timestamps:false,
}

const User= sequelize.define(alias,cols,config);

return User;
}