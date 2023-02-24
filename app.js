const express=require('express')
const app=express()
const mongoose=require('mongoose');
const methodOverride=require('method-override')
const articleRouter=require('./routes/article.js')
const Article=require('./models/article.js')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use('/articles',articleRouter)


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/blog');
  
  app.get('/',async (req,res)=>{
    const articles=await Article.find().sort({createdAt:'desc'})
    // articles.reverse()
    res.render('articles/index.ejs',{articles:articles})
    console.log(await Article.find())
})
app.listen(80,()=>{
    console.log('app is started in port 80')
})
}
