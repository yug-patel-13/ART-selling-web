import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <div id="Header">
    <div id="home-content">
          <section className="welcome-section">
            <h1>Welcome to Art Gallery</h1>
            <p>Discover a world of creativity and inspiration through our exquisite collection of artworks.</p>
          </section>
          <section className="featured-artworks">
            <h2 style={{color:"red"}}>Featured Artworks</h2>
            <div className="artwork-grid">
              <div className="artwork-item">
                <Link to="/sketches" >
                  <img src="sketch3.jpeg" alt="Featured Artwork 1"id="paint" style={{ height: "100px", width: "100px" }} />
                  <p>Sketches</p>
                </Link>
              </div>
              <div className="artwork-item">
                <Link to="/paintings" >
                  <img src="painting6.jpeg" alt="Featured Artwork 2" id="paint" style={{ height: "100px", width: "100px"}} />
                  <p>Paintings</p>
                </Link>
              </div>
              <div className="artwork-item">
                <Link to="/more">
                  <img src="artlogo.jpg" alt="Featured Artwork 3" id="paint"style={{ height: "100px", width: "100px" }} />
                  <p>Click for custom artwork</p>
                </Link>
              </div>
            </div>
          </section>
          <section className="artist-bio">
            <h2>About the Artist</h2>
            <p>Yug Patel is a contemporary artist known for his unique approach to painting and sketching. With over 6 years of experience, he has mastered the art of capturing emotions and storytelling through his artwork.</p>
            <p>Born and raised in a small town, Yug developed a passion for art at a young age. He pursued his dreams by studying Fine Arts at the prestigious Art Institute, where he honed his skills and developed his distinct style.</p>
            <p>Yug's works have been featured in numerous exhibitions and galleries around the world. His art is a reflection of his personal experiences, emotions, and the world around him. He believes in the power of art to connect people and inspire change.</p>
            <p>When he's not painting, Yug enjoys teaching art classes, traveling, and exploring new cultures. His journey as an artist continues to evolve, and he is always looking for new ways to express his creativity.</p>
          </section>
        </div>
    </div>
    </div>
  )
}

export default Home
