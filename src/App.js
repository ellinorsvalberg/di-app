import './App.css';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';

const rssURL = 'https://www.di.se/rss'
const Parser = require('rss-parser');
const parser = new Parser();

export default function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchArticles() {
      const feed = await parser.parseURL(rssURL);

      feed.items.map(item => item.pubDate = new Date(item.pubDate).toLocaleString());
      setResponse(feed.items)
    }

    fetchArticles();
  }, []);

  const sortedArticles = response && response.sort((a, b) =>  b.pubDate - a.pubDate).slice(0, 10);

  return (
    <div className="App">
      <header>
        <h1>Senaste nytt från Dagens Industri</h1>
        <p>Här hittar du de 10 senaste artiklarna från Di!</p>
        {sortedArticles && sortedArticles.map(( {title, pubDate, creator, link}) =>
          <Collapsible className="titles" trigger={title}>
            {creator ? <p>Journalist - {creator}</p> : null}
            <p>Publicerad - {pubDate}</p>
            <p><b>Läs artikeln <a href={link} target="_blank" rel="noreferrer">här</a></b></p>
          </Collapsible>
        )}
      </header>
    </div> 
  )
}
