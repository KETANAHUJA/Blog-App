
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _  = require("lodash");

mongoose.connect("mongodb+srv://admin-ketan:Testketan@cluster0.gsh8i.mongodb.net/blogDB", {useNewUrlParser: true});

// var posts = [];
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante elit, mollis a magna ac, tristique rutrum magna. Integer iaculis sollicitudin massa. Fusce scelerisque dapibus viverra. Cras euismod, neque quis placerat molestie, ex turpis molestie lectus, et hendrerit velit nunc non purus. Curabitur dignissim odio nec semper sollicitudin. Curabitur lacinia tincidunt ipsum, id consequat odio efficitur facilisis. Duis elit sapien, aliquet sed ex at, rutrum imperdiet felis. Donec eros augue, tristique sed elit sit amet, efficitur consequat velit. Fusce sapien lacus, ultricies sit amet ante at, vestibulum ultrices neque. Integer mi turpis, interdum ac elit pharetra, feug";
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante elit, mollis a magna ac, tristique rutrum magna. Integer iaculis sollicitudin massa. Fusce scelerisque dapibus viverra. Cras euismod, neque quis placerat molestie, ex turpis molestie lectus, et hendrerit velit nunc non purus. Curabitur dignissim odio nec semper sollicitudin. Curabitur lacinia tincidunt ipsum, id consequat odio efficitur facilisis. Duis elit sapien, aliquet sed ex at, rutrum imperdiet felis. Donec eros augue, tristique sed elit sit amet, efficitur consequat velit. Fusce sapien lacus, ultricies sit amet ante at, vestibulum ultrices neque. Integer mi turpis, interdum ac elit pharetra, feug.";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante elit, mollis a magna ac, tristique rutrum magna. Integer iaculis sollicitudin massa. Fusce scelerisque dapibus viverra. Cras euismod, neque quis placerat molestie, ex turpis molestie lectus, et hendrerit velit nunc non purus. Curabitur dignissim odio nec semper sollicitudin. Curabitur lacinia tincidunt ipsum, id consequat odio efficitur facilisis. Duis elit sapien, aliquet sed ex at, rutrum imperdiet felis. Donec eros augue, tristique sed elit sit amet, efficitur consequat velit. Fusce sapien lacus, ultricies sit amet ante at, vestibulum ultrices neque. Integer mi turpis, interdum ac elit pharetra, feugo.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title: String,
  body : String
};

const Post =  mongoose.model("Post",postSchema);


app.get("/",(req,res)=>{

  Post.find({}, function(err, posts){

    res.render("home", {
 
      startingContent: homeStartingContent,
 
      allPosts: posts
 
      });
 
  })
  // res.render("home",{StartingContent:homeStartingContent,allPosts:posts});
  // console.log(posts);

})

app.get("/about",(req,res)=>{
  res.render("about",{aboutContent:aboutContent});
})



app.get("/posts/:postId",(req,res)=>{
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId},(err,post)=>{
      res.render("post",{
        title:post.title,
        body:post.body
      });
    
  })
  // const title = _.lowerCase(req.params.topic);
  // posts.forEach((post)=>{
  //   if(_.lowerCase(post.title)===title){
  //     res.render("post",{val:post});
  //   }
  
  // })
  
});

// app.get("/posts/:topic",(req,res)=>{
//   const title = _.lowerCase(req.params.topic);
//   posts.forEach((post)=>{
//     if(_.lowerCase(post.title)===title){
//       console.log("matced");
//     }
//     else{
//       console.log("not matched");

//     }
    
//   })
  
// })

app.get("/contact",(req,res)=>{
  res.render("contact",{contact:contactContent});
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})
app.post("/compose",(req,res)=>{
  const post = new Post({
    title:req.body.postTitle,
    body: req.body.postBody
  });
  // var post = {
  //   title:req.body.postTitle,
  //   body:req.body.postBody
  // };
  // posts.push(post);

  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
  
})








app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
