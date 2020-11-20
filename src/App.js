import './App.css';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';

let Parser = require('rss-parser');
let parser = new Parser();

export default function App() {
  const [response, setResponse] = useState(null);
  const articles = []

  useEffect(() => {
    async function fetchArticles() {
      const feed = await parser.parseURL('https://www.di.se/rss');

      feed.items.forEach(item => {
          item.pubDate = new Date(item.pubDate).toLocaleString();
          articles.push(item);
      });

      setResponse(articles);
    }

    fetchArticles();
  },);

  const sortedArticles = response && response.sort((a, b) =>  b.pubDate - a.pubDate).slice(0, 10);

  return (
    <div className="App">
      <header>
        <h1>Senaste nytt från Dagens Industri</h1>
        <p>Här hittar du de 10 senaste artiklarna från Di!</p>
        {sortedArticles && sortedArticles.map(( {title, pubDate, creator, link}) => {
          return (
            [
              <Collapsible className="titles" trigger={title}>
                <p>Journalist - {creator}</p>
                <p>Publicerad - {pubDate}</p>
                <p><b>Läs artikeln <a href={link} target="_blank" rel="noreferrer">här</a></b></p>
              </Collapsible>,
            ] 
          )
        })}
      </header>
    </div> 
  )
}
