import exprees from 'express';
import multer from 'multer';
import path from 'path';
import upload from '../helper/multerConfig.js'
import usersmodel from '../model/Users.js';
import blogsmodel from '../model/Blogs.js';
import { where } from 'sequelize';
import db from '../config/db.js';

const router = exprees.Router()


router.get('/getblogs' , async(req , res ) => {

        const allblogs = await blogsmodel.findAll();
        if(allblogs){
            res.send(
                {
                    success : true,
                    blogs : allblogs
                    
                }
            )
        }else{
            res.send(
                {
                    success : false,
                    masg : 'Something Went Wrong',
                   
                }
            )
        }

})

router.post('/update' , async(req , res) => {
            const { id ,  blogbody, blogtitle} = req.body

            const updateblog = await blogsmodel.update(
                {
                    blogbody :blogbody,
                    blogtitle :blogtitle,
                 }, {
                where: {
                  id: id
                }
              });
            

            if(updateblog) {
                res.send(
                    {
                        masg:"ok",
                        status:true
                    }
                )
            }
})
 
router.post('/deleteblog' , async(req , res) => {
    const {id} = req.body

    const deleteblog = await blogsmodel.destroy(
        {
            where:{
                id:id
            }
        }
    )
    if(deleteblog){
        res.send(
            {
                status: true,
                msg : "blog was deleted successfully"
            }
        )
    }else{
        res.send(
            {
                status: false,
                msg : "the blog was not deleted"
            }
        )
    }

})

router.post('/addnewblog', async (req , res) => {

    try {
        // 'avatar' is the name of our file input field in the HTML form


        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields

            // console.log( "/store/server/public/uploads/ " + classifiedsadd.image)

            const {blogbody , blogtitle , userid ,Name} = req.body 
            const addblog =  blogsmodel.create({
                blogbody: blogbody,
                blogtitle: blogtitle,
                userid: userid,
                Name : Name,
            })
            
            if(addblog) {
                res.send(
                    {
                        success: true,
                        message: 'Blog Added Successfully'
                    }
                )
            }else{
                res.send(
                    {
                        success: false,
                         message: 'Something Went Wrong'
                    }
                )
            }
    
        }); 

    }catch (err) {console.log(err)}

    })

router.post ('/addnewuser'   ,  async (req , res) => {
        const { UserName, UserPassword,Pawer } = req.body

        const check = await usersmodel.findOne({
            where : {
                UserName : UserName
            }
        })
        if(check ) {
            res.send({
                success: false,
                msg: 'Username already exists'
        })}else{
            const createuser = await usersmodel.create({
                UserName : UserName,
                UserPassword    : UserPassword,
                Pawer : Pawer
            })
            if(createuser) {
            const getid = await usersmodel.findOne(
                {
                    where : {
                        UserName : UserName
                    }
                }
            )
            if(getid) {
                res.send({
                    success: true,
                    userid : getid.id,
                    UserName : getid.userName,
                  

            })
            }
              
        }else{
            res.send({
                success: false,
                
            })
        }


        }
    }   
)


router.post ('/Loginmodel'   , async  (req , res) => {
    const { UserName, UserPassword, Pawer } = req.body
    
        const check = await usersmodel.findOne({
            where : {
                UserName : UserName ,
                UserPassword :  UserPassword ,
            }
        })
        if(check ) {
            res.send({
                 success: true,
                msg: 'User already exists',
                id : check.id,
                UserName : check.UserName
         })}
        else {
            success : false 
            msg : 'USER DONT exists'
        }  })      
export default router