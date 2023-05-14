import { loginRequest } from "./requests.js"

function redirect(){
    let signUp = document.querySelectorAll(".signUp")
    let home = document.querySelector("#home")

    signUp.forEach((button =>{
        button.addEventListener("click", ()=>{
            window.location.replace("./signUp.html")
        })
    }))

    home.addEventListener("click", ()=>{
        console.log("click")
        window.location.replace("../../index.html")
    })
}

function handleLogin(){
    const formInputs = document.querySelectorAll(".formInput")
    const emailField = document.querySelector(".email")
    const passwordField = document.querySelector(".password")
    const submitButton = document.querySelector(".submit")
    let loginBody = {}
    let count = 0 

    submitButton.addEventListener("click", async (event)=>{
        event.preventDefault()
        formInputs.forEach((input)=>{
            if(input.value.trim() === ""){
                count++
            }
        })

        loginBody.email = emailField.value
        loginBody.password = passwordField.value

        if(count != 0){
            console.log("error")
        } else {
            const token = await loginRequest(loginBody)
            return token
        }
    })
}

redirect()
handleLogin()