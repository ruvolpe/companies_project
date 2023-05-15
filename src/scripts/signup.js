import { signupRequest } from "./requests.js"

function redirect(){
    let logIn = document.querySelector("#logIn")
    let home = document.querySelectorAll(".home")

    logIn.addEventListener("click", ()=>{
        window.location.replace("././login.html")
    })
    
    home.forEach((button) =>{
        button.addEventListener("click", ()=>{
            console.log("click")
            window.location.replace("../../index.html")
        })
    })
    
}


async function handleSignup(){
    let formInputs = document.querySelectorAll(".formInput")
    let nameField = document.querySelector(".name")
    let emailField = document.querySelector(".email")
    let passwordField = document.querySelector(".password")
    let registerButton = document.querySelector(".register")
    let signupBody = {}
    let count = 0
    
    registerButton.addEventListener("click", async (event)=>{
        event.preventDefault()
        
        formInputs.forEach((input)=>{
            if(input.value.trim() === ""){
                count++
            }
        })
        
        signupBody.name = nameField.value
        signupBody.email = emailField.value
        signupBody.password = passwordField.value
        
        if(count != 0){
            console.log("error")
        } else {
            const token = await signupRequest(signupBody)
            return token
        }
    })
}

redirect()
handleSignup()