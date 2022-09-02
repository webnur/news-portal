
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

    categories.forEach(category => {
        console.log(category)
    })
}

displaycategoryName()