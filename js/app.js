
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
        const {category_name} = category;
        
        console.log(category)
        const li = document.createElement('li');
        li.innerHTML = `<a href="">${category_name}</a>`;
        categoriyMenu.appendChild(li)
    })
}

displaycategoryName()