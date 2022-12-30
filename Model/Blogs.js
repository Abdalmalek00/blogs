import  {Sequelize  , DataTypes }  from  'sequelize'
import  db from '../config/db.js'





const blogs = db.define( 'blogs' , {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogbody : {
        type:  DataTypes.STRING,
    },
    blogtitle: {
        type : DataTypes.STRING,
    },
    userid : {
        type: DataTypes.INTEGER,
    },
     Name: {
        type : DataTypes.STRING,
    },


} , 
{
    timestamps: false,
    tableName: 'blogs',
    freezeTableName:true,
})

async function migratoin () {
    await blogs.sync();
}
migratoin()


export default blogs