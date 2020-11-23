import './App.css'
import React, { useEffect, useState } from 'react'
import Collapsible from 'react-collapsible'

const Parser = require('rss-parser')
const parser = new Parser()
const RSS_URL_DI = 'https://www.di.se/rss'
const RSS_URL_EXPRESSEN = 'http://feeds.expressen.se/nyheter'
const RSS_URL_DN = 'https://www.dn.se/rss/'

export default function App() {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    async function fetchArticles() {
      const [di_feed, expressen_feed, dn_feed] = await Promise.all([parser.parseURL(RSS_URL_DI), parser.parseURL(RSS_URL_EXPRESSEN), parser.parseURL(RSS_URL_DN)])
      const feed = di_feed.items.concat(expressen_feed.items.concat(dn_feed.items))
      const articles = feed.map(item => ({ ...item, pubDate: new Date(item.pubDate).toLocaleString() }))

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
