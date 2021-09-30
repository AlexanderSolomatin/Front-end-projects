function Password(parent, open){
    let inputPassw = document.createElement("input")
    inputPassw.setAttribute('type', 'password')
    parent.appendChild(inputPassw) 

    let checkBox = document.createElement('input');
    checkBox.setAttribute("type", 'checkbox');
    parent.appendChild(checkBox)    
    
    this.setValue = (text) => inputPassw.value = text
    this.getValue = () => inputPassw.value

    this.setOpen = (open) =>  checkBox.checked = open
    this.getOpen = () =>  checkBox.checked

    this.getInputPassw = () => inputPassw
    this.checkBox = () => checkBox
    this.checkBoxShow = (value) => inputCheck.style.display = value

    this.onChange = (value) => console.log(value)
    this.onOpenChange = open => open === true ? inputPassw.type = "text" : inputPassw.type = "password"
    
    inputPassw.oninput = () => this.onChange(this.getValue())
    checkBox.onchange = () => this.onOpenChange(this.getOpen())
}

let password = new Password(document.body)

//LoginForm

function Login(parent){
    let inputLogin = document.createElement('input');   
    parent.appendChild(inputLogin)

    this.setValue = (text) => inputLogin.value = text
    this.getValue = () => inputLogin.value
    this.getLogin = () => inputLogin
    this.onChange = (value) => console.log(value)

    inputLogin.oninput = () => this.onChange(this.getValue())
}

function Button(parent) {
    let button = document.createElement('button')
    button.innerHTML = 'Button'
    button.setAttribute("disabled", "true")
    parent.appendChild(button) 

    this.setDisabled = (value) => button.disabled = value
    this.getBtn = () => button
    this.setDisabled(true)
}


function LoginForm(parent){
    let form = document.createElement('form')
    parent.appendChild(form)

    let login = new Login(form)
    let password = new Password(form)
    let button = new Button(form)
    
    this.checkButton = () => (login.getValue() != '' && password.getValue() !== "" ? button.setDisabled(false) : button.setDisabled(true))

    login.getLogin().addEventListener("input", this.checkButton)
    password.getInputPassw().addEventListener("input", this.checkButton)

}

let loginForm = new LoginForm(document.body)

