import { renderSectorList, renderSelect, idToName } from "./render.js"

function redirect(){
    let logIn = document.querySelector("#logIn")
    let signUp = document.querySelector("#signUp")

    logIn.addEventListener("click", ()=>{
        window.location.replace("../src/pages/logIn.html")
    })

    signUp.addEventListener("click", ()=>{
        window.location.replace("../src/pages/signUp.html")
    })
}

const allCompanies = await idToName()

async function filterSectorList(){
    let select = document.querySelector("#sector__select")
    
    select.addEventListener("change", async () => {

        if(select.value === ""){
           renderSectorList(allCompanies)
        } else{
            let result = allCompanies.filter(company => {
                if (company.category_id === select.value)
                return company
            })
            renderSectorList(result)
        }
    })
}

redirect()
renderSelect()
renderSectorList(allCompanies)
filterSectorList()