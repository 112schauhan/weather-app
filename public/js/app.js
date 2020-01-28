const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const paraFirst=document.querySelector('#messageOne')
const paraSecond=document.querySelector('#messageTwo')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()


    const location=search.value

    paraFirst.textContent='Loading....'
    paraSecond.textContent=' '
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            paraFirst.textContent=data.error
        }else {
            paraFirst.textContent=data.location
            paraSecond.textContent=data.forecast
        }
    })
})
})