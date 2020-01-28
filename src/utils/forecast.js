const request=require('request')

const forecast=(latitude,longitude,location,callback)=>{
    const url='https://api.darksky.net/forecast/388cdac3dfbc34f4dce326d770c61c5f/'+latitude+','+longitude

    request({url,json:true},(error,{ body })=>{
        if(error){
            callback('Unable to connect to internet',undefined)
        }

        else if(body.error){
            callback('Put appropriate location',undefined)
        }

        else{
            callback(undefined,'It is currently '+body.currently.temperature+' and '+body.currently.precipProbability+' chances of rain at '+location)
        }
    })
}



module.exports=forecast