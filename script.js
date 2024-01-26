const button = document.getElementById('test');
const articleDiv = document.getElementById('article-display');
const apiKey = 'zaasZ4lG8k71yg0Ga3RoHT5BTHy1VkyV';

button.addEventListener('click', (e)=> {
    e.preventDefault;
    //User Input
    const userQuery = 'AI';
    const userQuantity = 5;
    let start = '20230101';
    let end = '20240101';

    //Query
    const query = userQuery.toLowerCase();    //* remove spaces
    const quantity = userQuantity || 10;
    let beginDate = '&begin_date=';
    let endDate = '&end_date='

    //Result
    let info;
    articleDiv.innerHTML = '';


    //Check whether start and end dates exist and add them to the query if they do
    start ? beginDate += start : beginDate = '';
    end ? endDate += end : endDate='';

    const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}${beginDate}${endDate}&api-key=${apiKey}`;

    //Fetch request
      fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        
        const results = data.response?.docs;
      
        console.log(`Search Term: ${query}`);
        console.log(`Number of Articles to Retrieve: ${quantity}`);
        console.log(`Start Date: ${start}`);
        console.log(`End End: ${end}`);

        //Looping through the articles to extract the abstract, publication date and url information
        for (let i=0; i<quantity; i++){
            const article = results[i];
            const rawDate = article?.pub_date;
            const pubDate = rawDate?.slice(0,10);
            const articleURL = article?.web_url;
            
            console.log(`Top Article ${i+1}: ${article?.abstract};
            Publication Date: ${pubDate}
            URL: ${articleURL}`);

            //Display results on the page
            info = `<p>Top Article ${i+1}: ${article?.abstract}<br/>
            Publication Date: ${pubDate}</br>
            URL: ${articleURL} </p>`;

            !results.length ? info= '': info;
            articleDiv.innerHTML += info;
        }

        info ? info: articleDiv.innerHTML='No articles matching your query.'
        
        
        console.log(results);

        
      });
    
  });