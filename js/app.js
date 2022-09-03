
const loadNews = async () => {
    const url =`https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json()

    // console.log(data.data.news_category)
    return data.data.news_category;


}

const displaycategoryName = async () => {
    const categories = await loadNews() 
    // console.log(categories)
    
    const categoriyMenu = document.getElementById('categories');
    categories.forEach(category => {

        const {category_name, category_id} = category;
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="loadCategoryData('${category_id}')">${category_name}</a>`;
        categoriyMenu.appendChild(li)
    })
}


const loadCategoryData = categoryId => {
   const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`;
   fetch(url)
   .then(response => response.json())
   .then(data => displayCategoryData(data.data))

}

const displayCategoryData = posts => {
    // console.log(posts)
    const notFoundCategory = document.getElementById('not-found-category');
    if(posts.length === 0){
        
        notFoundCategory.classList.remove('hidden')
    }
    else{
        notFoundCategory.classList.add('hidden')
    }
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ``;
    const postQuantity = document.getElementById('post-quantity');
    postQuantity.innerText = posts.length;
    // console.log(posts.length)
    posts.forEach(post => {
        // console.log(post)
        
        const {author, details, image_url, thumbnail_url, title, total_view, _id} = post;

        const postDiv = document.createElement('div');
        postDiv.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl');

        postDiv.innerHTML = `
        <figure><img src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details.slice(0, 200)}</p>
          <!-- author information div  -->
          <div class="lg:flex items-center">
            <img src="${author.img}" class="rounded-full w-20" />
            <h4 class="ml-3">${author.name ? author.name : 'Not Found'}</h4>
            <h5 class="ml-5">view ${total_view ? total_view : 'Not Found'}</h5>
            <div class="rating ml-5">
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" checked />
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" />
              </div>
          </div>
          <div class="card-actions">
            <label for="my-modal-3" class="btn modal-button btn-primary" onclick="showPostDetails('${_id}')">View Post</label>
          </div>
        </div>
        
        
        
        `;
        // postContainer.innerHTML = ``
        postContainer.appendChild(postDiv)
       
    });
}



// show post details 
const showPostDetails = postId =>{
    const url =` https://openapi.programming-hero.com/api/news/${postId}`
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayshowPsotDetail(data.data[0]))
}

// display show post details
const displayshowPsotDetail = postData => {
    console.log(postData)
    
    const {thumbnail_url, details, title} = postData;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${thumbnail_url}" class="w-full" />
    <h4 class="text-1xl font-bold my-4">${title}</h4>
    <p>${details}</p>
    
    `;

    
}
displaycategoryName('')