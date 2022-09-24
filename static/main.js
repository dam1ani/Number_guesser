const container = document.querySelector('.container')
const sizeEl = document.querySelector('.size')
let size = 28
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')
const h1 = document.getElementById("a")

let draw = false;
let data = Array(size*size).fill(0);

function populate(size) {
  container.style.setProperty('--size', size)
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div')
    div.classList.add('pixel')

    div.addEventListener('mouseover', function(){
        if(!draw) return;
        div.style.backgroundColor = color.value
        h1.style.color =color.value;

        data[i] = 1;
        submit()
    })
    div.addEventListener('mousedown', function(){
        div.style.backgroundColor = color.value;
        h1.style.color =color.value;
        data[i] = 1;
        submit()
    })

    container.appendChild(div)
  }
}

window.addEventListener("mousedown", function(){
    draw = true
})
window.addEventListener("mouseup", function(){
    draw = false
})

function reset(){
    container.innerHTML = ''
    data = Array(size*size).fill(0);
    h1.innerText = ""
    populate(size)
}

resetBtn.addEventListener('click', reset)

async function submit() {
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    }
    const obj = await fetch('/',options);
    const json = await obj.json();
    h1.innerText = json.key1
    console.log(json.key1);
}

populate(size)