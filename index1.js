import { News } from "./News.js"

let newsData = [
    {
        srcImg: 'public/Images1.jpeg',
        newsTitle: 'The Amazon Rainforest: Lungs of the Earth',
        newsContent: 'The Amazon Rainforest covers over 5.5 million square kilometres across nine countries in South America. It is home to an estimated 10% of all species on Earth, including 40,000 plant species, 1,300 bird species, and 3,000 types of fish. Scientists warn that continued deforestation threatens not only biodiversity but also global climate stability.'
    },
    {
        srcImg: 'public/Images2.jpeg',
        newsTitle: 'The Northern Lights: Nature\'s Greatest Light Show',
        newsContent: 'The Aurora Borealis, commonly known as the Northern Lights, can be seen in countries like Norway, Iceland, Canada, and Finland. This breathtaking natural phenomenon is caused by charged particles from the sun colliding with gases in Earth\'s atmosphere. The best time to witness this spectacular display is between September and March, away from city lights.'
    },
    {
        srcImg: 'public/Images3.jpeg',
        newsTitle: 'The Great Barrier Reef: An Underwater Wonder',
        newsContent: 'Stretching over 2,300 kilometres along the coast of Queensland, Australia, the Great Barrier Reef is the world\'s largest coral reef system. It supports an extraordinary diversity of marine life, including over 1,500 species of fish and 4,000 types of mollusc. Rising ocean temperatures due to climate change pose a serious threat to this UNESCO World Heritage Site.'
    }
];


function generateNews() {
  let paragraphs = document.querySelectorAll("#content p")
  paragraphs.forEach(function(p, i) {
    let data = newsData[i]
    let newsItem = new News(data.newsTitle, data.srcImg, data.newsContent)

    newsItem.show(p)
  })
}

generateNews()
