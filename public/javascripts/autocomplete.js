var input = document.getElementById('autocomplete')

input.addEventListener('keyup', e => {
    var results = document.getElementById('results')
    if(e.target.value.length > 3){
        results.style.display = 'block'  
    }else{
        results.style.display = 'none'
    }
})
