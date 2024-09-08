import React, { useState, useEffect } from 'react';
import { getRandomQuote, postQuote, searchQuotesByAuthor } from './QuoteService';
import twitter from '../assets/images/Twitter.png'; 

const HomePage = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [author, setAuthor] = useState('');
  const [searchedQuotes, setSearchedQuotes] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = async () => {
    try {
      const response = await getRandomQuote();
      console.log('Response from API:', response);
      setQuote(response.data);
      setShowSearchResults(false);
    } catch (error) {
      console.error('Error fetching random quote:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const quotes = await searchQuotesByAuthor(author);
      setSearchedQuotes(quotes); 
      setShowSearchResults(true);
    } catch (error) {
      console.error('Error searching quotes by author:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const tweetQuote = () => {
    const tweetText = `"${quote.text}" — ${quote.author}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };


  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='bg-white rounded-[20px] py-[30px] px-[30px] shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl'>
        <h1 className='font-bold text-[24px] leading-[40px] text-center animate-fadeIn'>
          Quote of the Day
        </h1>
        <div className='border border-[#4579B2] mt-2 bg-[#4579B2] h-[2px] rounded-[5px] w-[80px] mx-auto animate-grow'></div>

        <div>
          <p className='pt-6 font-semibold text-[18px] leading-[40px] text-center animate-slideUp'>
            "{quote.text}"
          </p>
          <div className='text-right'>
            <p className='font-normal pt-3 italic text-[18px] text-gray-600 animate-fadeInRight'>
              — {quote.author}
            </p>
          </div>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className='flex justify-center items-center pt-6'>
            <div className='loader'></div>
          </div>
        ) : showSearchResults && (
          <div className='pt-6'>
            <h2 className='font-bold text-[18px] leading-[30px] text-center animate-slideDown'>
              Search Results for "{author}"
            </h2>
            {searchedQuotes.length > 0 ? (
              <div className='grid grid-cols-1 gap-4 mt-4'>
                {searchedQuotes.map((q, index) => (
                  <div key={index} className='border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-lg transition duration-300 transform hover:scale-105'>
                    <p className='font-semibold text-[16px] text-center animate-fadeIn'>
                      "{q.text}"
                    </p>
                    <p className='text-right italic text-gray-600 mt-2'>
                      — {q.author}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className='pt-6 font-semibold text-[18px] text-center animate-slideUp'>
                No quotes found for this author.
              </p>
            )}
          </div>
        )}

        <div className='flex justify-center gap-5 mt-6'>
          <button
            className='bg-[#4579B2] hover:border hover:border-[#4579B2] hover:bg-white hover:text-black w-[150px] h-[50px] transition-all duration-300 ease-in-out rounded-full font-medium text-[16px] text-white text-center animate-bounce'
            onClick={fetchRandomQuote}
          >
            New Quote
          </button>
          <div
            className='cursor-pointer hover:bg-[#4579B2] hover:text-white border border-[#4579B2] bg-white text-black w-[150px] h-[50px] transition-all duration-300 ease-in-out rounded-full font-medium text-[16px] flex justify-center items-center'
            onClick={tweetQuote}
          >
            <img src={twitter} className='w-[30px] mr-2' alt="Tweet" />
            Tweet
          </div>
        </div>

        {/* Search Box */}
        <div className='mt-6'>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Search by author"
            className='border border-gray-300 rounded-[5px] w-full p-2 mb-2 focus:ring-2 focus:ring-[#4579B2] transition duration-300'
          />
          <button
            onClick={handleSearch}
            className='bg-[#4579B2] w-full py-[10px] text-white rounded-[5px] mt-2 hover:bg-[#2d6193] transition-all duration-300 ease-in-out'
          >
            Search Quotes
          </button>
        </div>
      </div>

      {/* Add custom loader for search */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #4579B2;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
