const express=require("express");
const path=require("path");
const sql = require('mssql');
const config=require("../config")
const İmageupload=require("../helpers/image-upload");

const router=express.Router();
const Admin=require("../controllers/admin");
router.get("/blog/delete/:blogid",Admin.get_blog_delete);
router.post("/blog/delete/:blogid",Admin.post_blog_delete)
router.get("/blog/create",Admin.get_blog_create);
router.post("/blog/create",İmageupload.upload.single("resim"), Admin.post_blog_create);
router.get("/blogs/:blogid",Admin.get_blog_edit);
router.post("/blogs/:blogid",İmageupload.upload.single("resim"),Admin.post_blog_edit)
router.get("/blogs",Admin.get_blogs);
router.get("/categories",Admin.get_categories);
router.get("/category/create",Admin.get_categories_create);
router.post("/category/create",Admin.post_categories_create);
router.get("/category/delete/:categoryid",Admin.get_categories_delete);
router.post("/category/delete/:categoryid",Admin.post_categories_delete)
router.get("/categorys/:categoryid",Admin.get_categories_edit);
router.post("/categorys/:categoryid",Admin.post_categories_edit);
module.exports=router;