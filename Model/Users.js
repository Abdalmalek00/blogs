import {Sequelize  , DataTypes} from 'sequelize'
import db from '../config/db.js'


const users = db.define( 'users' , {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserName : {
        type: DataTypes.STRING,  
    },
    UserPassword :{
        type: DataTypes.STRING,
    },
    Pawer: {
        type: DataTypes.INTEGER,
        }


}, 
{
    timestamps: false,
    tableName: "users",
    freezeTableName: true
})



export default users