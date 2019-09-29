const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
localStorage.clear()

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      const next = response.info.next
      localStorage.setItem('next_fetch', next);

      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = async () => {
  try {
    const nextFetchValue = localStorage.getItem('next_fetch');
  if(nextFetchValue === null){
    return await getData(API);
  }else{
    if (nextFetchValue === ""){
      alert("ya no hay personajes!")
      intersectionObserver.unobserve($observe)
      
    }
    return await getData(nextFetchValue);
  }
  } catch (error) {
    console.log(error)
  }
  
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);