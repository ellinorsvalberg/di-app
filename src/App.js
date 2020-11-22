import './App.css'
import React, { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'

const Parser = require('rss-parser')
const parser = new Parser()
const RSS_URL = 'https://www.di.se/rss'

export default function App() {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    async function fetchArticles() {
      const feed = await parser.parseURL(RSS_URL)
      const articles = feed.items.map(item => ({ ...item, pubDate: new Date(item.pubDate).toLocaleString() }))

      setResponse(articles)
    }

    fetchArticles()
  }, []);

  const sortedArticles = response && response.sort((a, b) => b.pubDate - a.pubDate).slice(0, 10)

  return (
    <div className="App">
      <header>
        <h1>Senaste nytt från Dagens Industri</h1>
        <p>Här hittar du de 10 senaste artiklarna från Di!</p>
        {sortedArticles && sortedArticles.map(({ ...item}) =>
          <Collapsible key={item.title} trigger={item.title}>
            {item.creator && <p>Journalist - {item.creator}</p>}
            <p>Publicerad - {item.pubDate}</p>
            <p><b>Läs artikeln <a href={item.link} target="_blank" rel="noreferrer">här</a></b></p>
          </Collapsible>
        )}
      </header>
    </div> 
  )
}
