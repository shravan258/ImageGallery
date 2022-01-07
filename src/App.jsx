import './app.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [imagesList, setimagesList] = useState([]);
  const [search, setsearch] = useState('');
  const [searchList, setsearchList] = useState([]);
  const URL = 'https://pixabay.com/api';
  const KEY = '24302617-99249ba60eedc8e8ab1ca5255';
  const getImages = async (event) => {
    const result = await axios.get('https://picsum.photos/v2/list');
    setimagesList(result.data);
  };

  useEffect(() => {
    getImages();
  }, []);

  const searchHandler = async (event) => {
    event.preventDefault();
    const searchValue = search.toLowerCase();
    const searchData = await axios.get(
      `${URL}/?key=${KEY}&q=${searchValue}&image_type=photo&safesearch=true`
    );
    setsearchList(searchData.data.hits);
  };

  return (
    <>
      <div className='c1'>
        <h1 className='heading'>Image Gallery</h1>
        <h3 className='heading-2'>Explore The world of images...</h3>
        <div
          style={{
            display: 'flex',
            width: 'min(80%,350px)',
            borderRadius: '6px',
            background: '#fff',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.3rem',
          }}
        >
          <input
            type='text'
            className='search-bar'
            value={search}
            onChange={(event) => setsearch(event.target.value)}
          />
          <button className='search-btn' onClick={searchHandler}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className=' image-container '>
        {searchList.length === 0 ? (
          <div>
            <h1>All Images</h1>
            <div className='gallery'>
              {imagesList.map((image) => (
                <div className='pics'>
                  <img
                    src={image.download_url}
                    alt=''
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <h1>Search Results</h1>
              <button
                onClick={() => setsearchList([])}
                className='close-button'
              >
                <CloseIcon />
              </button>
            </div>
            <div className='gallery'>
              {searchList.map((image) => (
                <div className='pics'>
                  <img
                    src={image.largeImageURL}
                    alt=''
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer class='page-footer font-small copy'>
        <div
          class='footer-copyright text-center py-3 '
          style={{ color: 'white' }}
        >
          © 2021 Copyright : Shravan Thombre
        </div>
      </footer>
    </>
  );
}

export default App;
