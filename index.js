document.addEventListener("DOMContentLoaded", () =>{
    const form = document.querySelector('form')
    
    // Post not working with the renderCard function and console.log of server data response
    //ins't staying on the page. -->Maybe a refresh error with e.default()?

    //need to fetch json-server when page loads. Can test renderCard funciton then.

    //fetch respons cycle is not correct . Submit button should not page refesh


    fetch('http://localhost:3000/algos')
    .then(res => res.json())
    .then(data => {
        data.forEach( algo => renderCard(algo) )
    })
    // handle fetch errors
    

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
        .then(cardData => {
            console.log(cardData)
            // renderCard(cardData)
        })
                   
        .catch(  err => alert("No Server Response", err))
        

    })

    function renderCard(cardData){
        const solutionsArea = document.querySelector(".solutions-area")
        const algoCard = document.createElement("div")
        algoCard.className = "card-body"
        algoCard.innerHTML = ` 
        <h4>Algorithm Name</h4>
            <p>${cardData.algoName}</p>
            <h6>What the Algorithm Does</h6>
            <p>${cardData.algoExplain}</p>
            <h6>Pseudo Code</h6>
            <p>${cardData.pseudo}</p>
            <h6>Javascript</h6>
            <p>${cardData.java}</p>
        
        `
        solutionsArea.appendChild(algoCard)
    }

    


})

