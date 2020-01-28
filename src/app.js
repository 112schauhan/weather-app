const express=require('express')
const hbs=require('hbs')
const partials=require('partials')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()

const path=require('path')
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/views')
const partialsDirectoryPath=path.join(__dirname,'../templates/partials')
const port=process.env.PORT || 3000


app.use(express.static(publicDirectoryPath))

app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)
app.set('view engine','hbs')
app.get('',(req,res)=>{
    res.render('index',{
        title:'WEATHER',
        name:'Surbhi Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Something about me',
        name:'Surbhi Singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Tell us',
        name:'Surbhi Singh'
    })
})

app.get('/weather',(req,res)=>{
   

    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    
    geocode(req.query.address,(error,{ latitude,longitude,location }={})=>{
          if(error){
              return res.send({error})
          }


          forecast(latitude,longitude,location, (error,forecastData)=>{
              if(error){
                  return res.send({error})
              }

              res.send({
                  forecast:forecastData,
                  address:req.query.address,
                  location
              })
          })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send(error)
    }else{
        res.send({
            item:'Toothpaste',
            type:'Medicated'
        })
    }
})

app.get('*',(req,res)=>{
    res.render('404',{
        error:'Page not Found!!'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Page not found'
    })
})



app.listen(port,()=>{
    console.log('Server is up on port '+port)
})