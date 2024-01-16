const api_key = "Enter your API-KEY here"

window.addEventListener('load', () => {
  fetchNews("india");
});

function reload() {
  window.location.reload();
}

async function fetchNews(keyword) {
  const url = `https://newsapi.org/v2/everything?q=${keyword}&apikey=${api_key}`;

  const response = await fetch(url)
  const data = await response.json();

  bindData(data);
}

function bindData(data) {
  const results = data.articles

  const cardContainer = document.getElementById('cards-container');
  cardContainer.innerHTML = "";

  results.map((result) => {
    if (!result.urlToImage) return;

    const card = document.createElement('div');
    card.classList.add('card');

    const descContainer = document.createElement('div');
    descContainer.classList.add('card-content');
    
    const img = document.createElement('img');
    const newsTitle = document.createElement('h3');
    newsTitle.classList.add('news-title');
    
    const publishedAt = document.createElement('h6');
    publishedAt.classList.add('news-source');
    
    const desc = document.createElement('p');
    desc.classList.add('news-desc');

    const showMoreBtnLink = document.createElement('a');
    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('show-more-btn');
    showMoreBtn.innerHTML = "Show More";
    showMoreBtnLink.appendChild(showMoreBtn);

    descContainer.appendChild(newsTitle);
    descContainer.appendChild(publishedAt);
    descContainer.appendChild(desc);
    descContainer.appendChild(showMoreBtnLink);

    card.appendChild(img);
    card.appendChild(descContainer);

    img.src = result.urlToImage;
    newsTitle.innerHTML = result.title;
    desc.innerHTML = result.description;
    showMoreBtnLink.href = result.url;
    showMoreBtnLink.target = "_blank";
    const date = new Date(result.publishedAt).toLocaleString("eg-us", {
      timeZone: 'Asia/Jakarta'
    });
    publishedAt.innerHTML = `${result.source.name} - ${date}`;

    cardContainer.appendChild(card);
  })

}

let currentSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currentSelectedNav?.classList.remove('active');
  currentSelectedNav = navItem;
  currentSelectedNav.classList.add('active');
}


const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('news-input');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var query = searchBox.value;
  if (!query) return;
  fetchNews(query);
});

function searchNewsByBtnClick(){
  query = searchBox.value;
  if (!query) return;
  fetchNews(query);
}

function openSearchBox(){
  const newsInput = document.getElementById('news-input');
  const closeSearchBar = document.getElementById('closeSearchBar');

  searchForm.style.display = "flex";
  searchForm.style.width = "100%";
  searchForm.style.position = "fixed";
  searchForm.style.right = "0px";
  searchForm.style.height = "60px";
  searchForm.style.justifyContent = "center";
  searchForm.style.backgroundColor = "#d4ecff";
  searchForm.style.borderRadius = "50px";
  
  newsInput.style.visibility = "visible";
  newsInput.style.borderRadius = "50px";
  newsInput.focus();

  closeSearchBar.style.display = "block";
}

const newsInput = document.getElementById('news-input');
if(window.innerWidth<700){
  searchForm.addEventListener('mouseleave', function(){
    searchForm.style.width = "0%";
    newsInput.style.visibility = "hidden";
  })
}

function closeSearchBar(){
  searchForm.style.width = "0%";
    newsInput.style.visibility = "hidden";
}

const menu = document.getElementById('menu');
let flag= 0;
menu.addEventListener('click', function(){
  const navLinks = document.getElementById('nav-links')
  const navLinksUl = document.getElementById('nav-link-ul')
  const menu = document.getElementById('menu')

  if(flag==0){
    navLinks.style.height = "130px"
    navLinks.style.borderTop = "1px solid #d7d7d7"
    navLinksUl.style.display = "flex";
    menu.classList.remove('material-symbols-outlined');
    menu.classList.add('material-symbols-outlined');
    menu.innerHTML = "close";
    flag=1;
  }
  else{
    navLinks.style.height = "0px"
    navLinks.style.borderTop = "none"
    setTimeout(() => {
      navLinksUl.style.display = "none";
    }, "1000");
    menu.classList.remove('material-symbols-outlined');
    menu.classList.add('material-symbols-outlined');
    menu.innerHTML = "menu";
    
    flag=0;
  }
})
