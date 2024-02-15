                     const express=require("express");
                     const path=require("path");
                     const router=express.Router();
                     const sql = require('mssql');
                     const config=require("../config")
                     

                    const userController=require("../controllers/user");
                     router.use("/blogs/category/:categoryid",userController.blogs_by_category );
                  
                  
                     router.use("/blogs/:blogid",userController.blogs_details );
                     
                     //VERİLERİ SAYFAYA SQL DEN CEKİP YOLLUYORUZ
                     router.use("/blogs",userController.blog_list);
                     router.use("/",userController.index);

                     module.exports=router;