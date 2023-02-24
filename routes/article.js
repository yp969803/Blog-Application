const express=require('express')
const router=express.Router()
const Article=require('./../models/article.js')

router.get('/new',(req,res)=>{
    res.render('articles/new.ejs',{article: new Article()})
})
router.get('/:slug',async (req,res)=>{
    const article=await Article.findOne({slug:req.params.slug})
    if(article==null){
      res.redirect('/')
    }
    else{
      res.render('articles/show',{article:article})
    }
})
router.get('/edit/:id',async(req,res)=>{
  let article=await Article.findById(req.params.id)
  res.render('articles/edit',{article:article})
})
router.post('/',async(req,res)=>{
  const{title,description}=req.body
  console.log(req.body)
  let article=new Article({
    title:title,
    description:description
  })
  try{
    await article.save()
    res.redirect(`/articles/${article.slug}`)
  }
  catch(e){
    console.log(e)
    res.render('articles/new',{article:article})
  }
})
router.put('/:id',async (req,res)=>{
  try{
    const {title,description}=req.body;
  let article=await Article.findById(req.params.id)
  article.title=title
  article.description=description
  await article.save()
  res.redirect('/')
  }
  catch(e){
    res.redirect(`/articles/edit/${article.id}`)
  }
})
router.delete('/:id',async (req,res)=>{
  try{
    let article=await Article.findById(req.params.id)
  await article.delete()
  res.redirect('/')
  }
  catch(e){
    console.log(e)
    res.redirect('/')
  }
})
module.exports=router