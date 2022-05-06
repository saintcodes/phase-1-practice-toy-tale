let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection = document.querySelector('#toy-collection')
const newToyForm = document.querySelector(".add-toy-form")
const newToyName = document.querySelector("input[name='name']").value
const newToyURL = document.querySelector("input[name='image']").value


fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => data.forEach(toy => rendersToys(toy)))
  

function rendersToys(toy) {
    const div = document.createElement('div')
    div.classList = 'card'
    const image = document.createElement('img')
    image.classList = 'toy-avatar'
    image.src = toy.image
    const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    const likeButton = document.createElement('button')
    likeButton.innerHTML = 'Like'
    likeButton.addEventListener('click', (e) =>{
      e.preventDefault()
      let updatedLikeCount = parseInt(e.target.previousElementSibling.innerText) + 1
      console.log(toy.id)
      const configurationObject = {
            method: "PATCH",
            headers: {
              'Content-Type': "application/JSON",
            },
            body: JSON.stringify({
              likes: `${updatedLikeCount}`
            })
          }

      fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject)
    .then(res => res.json())
    .then(toyObj => {e.target.previousElementSibling.innerText = `${updatedLikeCount} likes`})
    })

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = "Delete"
    // button2.addEventListener('click', () => div.remove())
    const para = document.createElement('p')
    para.innerHTML = `${toy.likes} Likes`
    toyCollection.append(div)
    div.append(h2, image, para, likeButton, deleteButton)
}

function submitForm(e) {
  e.preventDefault()

  let toyObj = {
    "name" : e.target.name.value,
    "image" : e.target.image.value,
    "likes" : 0
  }

  const configurationObject = {
    method: "POST",
    headers: {
      'Content-Type': "application/JSON",
    },
    body: JSON.stringify(toyObj)
  }

  fetch('http://localhost:3000/toys', configurationObject)
    .then(res => res.json())
    .then(toyObj => rendersToys(toyObj))
}

newToyForm.addEventListener('submit', submitForm)
