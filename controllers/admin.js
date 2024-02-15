    const Blog=require("../models/blog");
    const Category=require("../models/category");
    const fs=require("fs");

    module.exports.get_blog_delete=async function(req,res){
        const id=req.params.blogid;
        try
        {
        const blog=await Blog.findOne({
            where:{
            id:id
        },
        raw:true
        })
        res.render("admin/blog-delete",{
            title:"delete blog",
            blog:blog
        });
        }
        catch(err)
        {
        console.log(err);
        }
    }
    module.exports.post_blog_delete=async function(req,res){
        const blogid=req.body.blogid;
        try{
            // let db = await config;
            // let request = db.request();
            // const result = await request
            //  .input('blogid', sql.VarChar, blogid)
            //  .query("delete from blog where blogid=@blogid ");
            await Blog.destroy({
            where:{
                id:blogid
            },
            raw:true
            })
            res.redirect("/admin/blogs?action=delete");
        }
        catch(err)
        {
            console.log(err);
        }
        
    }
     module.exports.get_categories_delete=async function(req,res){
          const categoryid = req.params.categoryid;

          try {
              const category = await Category.findByPk(categoryid);
      
              res.render("admin/category-delete", {
                  title: "delete category",
                  category: category
              });
          }
          catch(err) {
              console.log(err);
          }
    }
    module.exports.post_categories_delete=async function(req,res){
        const categoryid=req.body.categoryid;
        try{
           
            await Category.destroy({
            where:{
                id:categoryid
            }
            });
            res.redirect("/admin/categories");
        }
        catch(err)
        {
            console.log(err);
        }
        
    }
    exports.get_blog_create = async function(req, res) {
          try {
              const categories = await Category.findAll();
      
              res.render("admin/blog-create", {
                  title: "add blog",
                  categories: categories
              });
          }
          catch(err) {
              console.log(err);
          }
    }
    module.exports.post_blog_create=async function (req, res) {
          const baslik = req.body.baslik;
          const altbaslik = req.body.altbaslik;
          const aciklama = req.body.aciklama;
          const resim = req.file.filename;
          const anasayfa = req.body.anasayfa == "on" ? 1:0;
          const onay = req.body.onay == "on"? 1:0;
          const kategori = req.body.kategori;
      
          try {
            await Blog.create({
              baslik: baslik,
              altbaslik: altbaslik,
              aciklama: aciklama,
              resim: resim,
              anasayfa: anasayfa,
              onay: onay,
              categoryId: kategori // "kategori" olarak değiştirildi
          });
              res.redirect("/admin/blogs?action=create");
          }
          catch(err) {
              console.log(err);
          }
    }
    module.exports.get_categories_create=async function(req,res){
        try{
            res.render("admin/category-create",{
            title:"add category",
            })
        
        }catch(err)
        {
        console.log(err);
        }
            
    }
    module.exports.post_categories_create= async function (req, res) {
            const name = req.body.ad;
            
            try {
                
                await Category.create({name:name})
            
                res.redirect("/admin/categories");
            } catch (err) {
                console.log(err);
                res.status(500).send(err.message); // Hata durumunu istemciye bildir
            }
            
            console.log(req.body); // Form verileri
    } 
    module.exports.get_blog_edit=async function(req,res){
          const blogid = req.params.blogid;

          try {
              const blog = await Blog.findByPk(blogid);
              const categories = await Category.findAll();
      
              if(blog) {
                  return res.render("admin/blog-edit", {
                      title: blog.dataValues.baslik,
                      blog: blog.dataValues,
                      categories: categories
                  });
              }
      
              res.redirect("admin/blogs");
          }
          catch(err) {
              console.log(err);
          }
    }
    module.exports.post_blog_edit=async function(req,res)
        {
            const blogid=req.body.blogid;
            const baslik=req.body.baslik;
            const altbaslik=req.body.altbaslik;
            const aciklama=req.body.aciklama;
            let resim=req.body.resim;
            if(req.file){
              resim=req.file.filename;
              fs.unlink("./public/images/"+req.body.resim,err=>{
                console.log(err);
              });
            }
            const anasayfa=req.body.anasayfa=="on" ? 1:0;
            const onay=req.body.onay=="on" ? 1:0;
            const kategori=req.body.kategori;
            try{
              const blog=await Blog.findByPk(blogid)
              if(blog){
                blog.baslik=baslik;
                blog.altbaslik=altbaslik,
                blog.aciklama=aciklama,
                blog.resim=resim,
                blog.anasayfa=anasayfa,
                blog.onay=onay,
                blog.categoryId=kategori
                await blog.save();
             return res.redirect("/admin/blogs?action=edit&blogid="+blogid)
              }
              res.redirect("/admin/blogs");
              
            }
            catch(err)
            {
              console.log(err);
            }
      
    }
    module.exports.get_categories_edit = async function(req, res) {
          const id = req.params.categoryid;
      
          try {
            const category = await Category.findByPk(id);
        const blogs = await category.getBlogs();
        const countBlog = await category.countBlogs();
      
              if (category) {
                  return res.render("admin/category-edit", {
                    title: category.dataValues.name,
                    category: category.dataValues,
                    blogs: blogs,
                    countBlog: countBlog
                  });
              }
      
              res.redirect("admin/categories");
          } catch (err) {
              console.log(err);
          }
    };
    module.exports.post_categories_edit=async function(req,res)
        {
            const blogid=req.body.categoryid;
            const ad=req.body.baslik;
            try{
              const category=await Category.findByPk(blogid)
              if(category){
                category.name=ad;
                await category.save();
                return res.redirect("/admin/categories")
              }
      
      
              
            }
            catch(err)
            {
              console.log(err);
            }
      
    }
    module.exports.get_blogs=async function(req,res){
            try{
              const blogs=await Blog.findAll({attributes:["id","baslik","altbaslik","resim"]});
              res.render("admin/blog-list",{
                title:"blog list",
                blogs:blogs,
                action:req.query.action,
                blogid:req.query.blogid
              });
            }
            catch(err)
            {
              console.log(err);
            }
          
    }
    module.exports.get_categories=async function(req,res){
            try{
              const categories=await Category.findAll();
              res.render("admin/category-list",{
                title:"category list",
                categories:categories,
              });
        
            }
            catch(err)
            {
              console.log(err);
            }
    }