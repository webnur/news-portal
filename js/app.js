
const loadNews = async () => {
    try {
        const url =`https://openapi.programming-hero.com/api/news/categories`;
        const response = await fetch(url);
        const data = await response.json()
    
        // console.log(data.data.news_category)
        return data.data.news_category;
    }

catch(error){
    console.log(error)
}

}

const displaycategoryName = async () => {


    try{
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
    catch(error){
        console.log(error)
    }

}


const loadCategoryData = categoryId => {
    // spinner add
    toggleSpinner(true)
   const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`;
   fetch(url)
   .then(response => response.json())
   .then(data => displayCategoryData(data.data))
   .catch(error => console.log(error))

}

const displayCategoryData = posts => {
    // spinner remove
    toggleSpinner(false)
    // console.log(posts)
    const notFoundCategory = document.getElementById('not-found-category');
    const itemQuaintity = document.getElementById('item-quaintity');
    const spinner = document.getElementById('spinner')
    if(posts.length === 0){
        
        notFoundCategory.classList.remove('hidden');
        itemQuaintity.classList.add('hidden');
        //spinner.classList.add('hidden');
        
    }
    else{
        notFoundCategory.classList.add('hidden')
        itemQuaintity.classList.remove('hidden')
       // spinner.classList.remove('hidden');
       
    }
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = ``;

    const postQuantity = document.getElementById('post-quantity');
    postQuantity.innerText = posts.length;

   
    // console.log(posts.length)
    posts.forEach(post => {
       
        
        const {author, details, image_url, thumbnail_url, title, total_view, _id} = post;

        const postDiv = document.createElement('div');
        postDiv.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl');

        postDiv.innerHTML = `
        <figure><img src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p>${details.slice(0, 200) + ' ...'}</p>
          <!-- author information div  -->
          <div class="lg:flex items-center">
            <img src="${author.img}" class="rounded-full w-20" />
            <h4 class="ml-3">${author.name ? author.name : 'Not Found'}</h4>
            <h5 class="ml-5"><i class="fa-regular fa-eye"></i> ${total_view ? total_view : 'Not Found'}</h5>

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
    
    const {thumbnail_url, details, title, author, rating, total_view} = postData;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${thumbnail_url}" class="w-80" />
    <h4 class="text-1xl font-bold my-4">${title}</h4>
    <div class="flex items-center">
        <img src="${author.img}" class="rounded-full w-20" />
        <h6 class="font-bold ml-3">Author: ${author.name ? author.name : 'not found'}</h6>   
    </div>
    <p class="font-bold">date: ${author.published_date ? author.published_date : 'Not Found Date'}</p> 
    <p class="font-bold mb-3"><span>Rating: ${rating.number ? rating.number : 'No rating here'},</span><span>Total View: ${total_view ? total_view : 'Not Found'}</span></p>
    <p>${details}</p>
    `;

    
}

// spinner function
const toggleSpinner = isLoading => {
    const loadSpinner = document.getElementById('spinner');
    if(isLoading){
        loadSpinner.classList.remove('hidden')
    }
    else{
        loadSpinner.classList.add('hidden')
    }
}
displaycategoryName('')