window.addEventListener('load', () => {

    console.log('page loaded')
    const form = document.getElementById('loginForm')
    form.addEventListener('submit', () => {
        console.log('submitted')
    })
    //let invalidFieldList = []
    // for(let i = 0; i < form.elements.length;i++){
    //     if(form.elements[i].type === 'text' || 
    //         form.elements[i].type === 'password'){
    //         if(!isTextFieldValid(form.elements[i])){
    //             invalidFieldList.push(form.elements[i].name)
    //         }
    //     }
    // }
    // console.log(invalidFieldList)
})

const isTextFieldValid = (field) => {
    if(field.value === '') return false
    else return true
}

const validate = (event) =>{
    if(event.target.value.length === 0 || event.target.value === ""){
        console.log('field invalid')
    }
}

const remove = (id) => {
   toggleModal('delete')
}

const toggleModal = (id) => {
    const modal = document.getElementById(id)
    modal.classList.add('is-active')
}


