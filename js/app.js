
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
        
        // console.log(category)
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="loadCategoryData('${category_id}')">${category_name}</a>`;
        categoriyMenu.appendChild(li)
    })
}


const loadCategoryData = categoryId => {
   const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`;
   console.log(url)
   fetch(url)
   .then(response => response.json())
   .then(data => displayCategoryData(data.data))

}

const displayCategoryData = posts => {
    // console.log(posts)
    posts.forEach(post => {
        console.log(post)
        const {author, details, image_url, thumbnail_url, title, total_view, category_id} = post;
        const postContainer = document.getElementById('post-container');
        // postContainer.innerHTML = ``
        const postDiv = document.createElement('div');
        postDiv.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl');

        postDiv.innerHTML = `
            <figure><img src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
            <h2 class="card-title">${title} ${category_id}</h2>
            <p>${details}</p>
            <div>
                <!-- author picture  -->
                <div class="md:flex items-center">
                <img src="${author.img}" class="rounded-full w-24" />
                <h5 class="ml-2">a${author.name}</h5>
                <div class="ml-8">
                    
                    <h4 class="text-3xl"><i class="fa-regular fa-eye"></i>${total_view}</h4>
                </div>
                <div class="rating rating-lg ml-8">
                    <input type="radio" name="rating-9" class="rating-hidden" />
                    <input type="radio" name="rating-9" class="mask mask-star-2" />
                    <input type="radio" name="rating-9" class="mask mask-star-2" checked />
                    <input type="radio" name="rating-9" class="mask mask-star-2" />
                    <input type="radio" name="rating-9" class="mask mask-star-2" />
                    <input type="radio" name="rating-9" class="mask mask-star-2" />
                </div>
                </div>
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Listen</button>
            </div>
            </div>
        
        
        
        `;
        // postContainer.innerHTML = ``
        postContainer.appendChild(postDiv)
        
    })
}

displaycategoryName()