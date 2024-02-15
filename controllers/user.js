const Blog=require("../models/blog");
const Category=require("../models/category");
const { Op }=require("sequelize");

module.exports.blogs_by_category=async function (req, res) {
    const id = req.params.categoryid;
    console.log(id);
    try {
      
       const blogs =await Blog.findAll({
          where:{
            categoryId:id,
             onay:true
          },
          raw:true
       });
       const category =await Category.findAll({raw:true});
       

       res.render("users/blogs", {
          title: "Tüm Kurslar",
          blogs: blogs,
          categories: category,
          selectedCategory:id
       });
    } catch (err) {
       console.log(err);
    }
}

module.exports.blogs_details=async function (req, res) {
    const id = req.params.blogid;
    try {
    const blogs=await Blog.findOne({
       where:{
          id:id
       },
       raw:true
    })

    //KONTROL KISMI EGER BLOG YOK İSE ANA SAYFAYA GİDERu
    if(blogs)
    {
       res.render("users/blog-details", {
          title:blogs.baslik,
          blog: blogs
       });
    }
    res.redirect("/");
    
    } catch (err) {
    console.log(err);
    }
 }
 module.exports.blog_list=async function(req,res){
    try{
       // let db = await config;
       // let request = db.request();
       // const result = await request.query('SELECT * FROM blog where onay=1');
       // const result2=await request.query('select * from category');
       // const category=result2.recordset;
       // const users = result.recordset;
       // console.log(users[1]);

       const users=await Blog.findAll({
          where:{
             onay:true
          },
          raw:true
       });
       const category=await Category.findAll({raw:true});
       res.render("users/blogs",{
          title:"Tüm Kurslar",
          blogs:users,
          categories:category,
          selectedCategory:null
       });
    }
    catch{

    }
    
 
 }

 module.exports.index=async function(req,res){
                     
    try{
       // let db = await config;
       // let request = db.request();
       // const result = await request.query('SELECT * FROM blog where onay=1 and anasayfa=1 ');
       // const result2=await request.query('select * from category');
       // const category=result2.recordset;
       // const users = result.recordset;
       // console.log(category[1]);
       const users=await Blog.findAll({
          where:{
             [Op.and]:[
                {anasayfa:true},
                {onay:true}
             ]
          },
          raw:true
       });
       const category= await Category.findAll({raw:true});



       //console.log(users[1]);
       res.render("users/index",{
          title:"Popiler Kurslar",
          blogs:users,
          categories:category,
          selectedCategory:null
       });
    }
    catch(err){
       console.log(err);
    }
    
 
 
 }