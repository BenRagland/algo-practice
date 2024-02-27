document.addEventListener("DOMContentLoaded", () =>{
    const form = document.querySelector('form')
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        const algoName = e.target["algo-name"].value
        const explanation = e.target.explanation.value
        const javascript = e.target.javascript.value
        const pseudo = e.target.pseudo.value


        
        //Post to Server and get response
        fetch('http://localhost:3000/algos',{
            method: "POST" ,
            headers:{
                "content-type": "application/json",
                "accept" : "application/json"
                },
            body : JSON.stringify({
                "algoName": algoName,
                "algoExplain": explanation,
                "pseudo": pseudo,
                "java": javascript
            })

        })
        
        .then(res => {
            if (res.ok){
                res.json()
            }else{
                alert("server error", res)
            }
        })
        .then(card => console.log(card))
        
        .catch(  err => alert("No Server Response", err))
        

    })


    


})

