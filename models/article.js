const mongoose=require('mongoose')
// const schema=mongoose.Schema();
const marked=require('marked')
const createdompurify=require('dompurify')
const{JSDOM}=require('jsdom')
const dompurify=createdompurify(new JSDOM().window)
const slugify=require('slugify')
const articleschema=mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    createdAt:{
        type:Date,
        default:new Date,
    },
    
    description:String,
    slug:{
        type:String,
        required:true,
        unique:true,
        
    }

})
articleschema.pre('validate',function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true,strict:true})
    }
    next()
})
module.exports=mongoose.model('Article',articleschema)