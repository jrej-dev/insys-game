import React, { useEffect, /*useState*/ } from 'react';
//import { useObserver } from 'mobx-react';
//import { toJS } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
//import StoreContext from '../../store/AppStore';
import { Link } from "react-router-dom";

//Components

const Home = () => {
  //const store = React.useContext(StoreContext);
  const heroBackgrounds = ["https://images.hive.blog/DQmaQYit3CSSit1xauqfrw3TUt2Rk5fqEhU4H5LU6EfbWwF/1.png", "https://images.hive.blog/DQmWo2niRmPWpoQaDVSxybhJkDsZyMEDbSB2fcv6CH9gGNj/2.png"]

  useEffect(() => {
  }, [])

  return (
    <div className="min-h-screen">
      <div className="vignette relative h-screen flex flex-col justify-center items-center">
        <img id="hero-image" className="absolute w-screen h-full object-cover top-0" src={heroBackgrounds[1]} alt="hero" />
        <h1 id="hero-title" className="z-10 text-gray-300 text-40 lg:text-70">Miniaturena</h1>
        <h2 className="z-10 text-gray-300 text-xl text-center px-6 m-4">A digital miniature wargame on the blockchain.</h2>
        <h2 className="z-10 text-gray-300 text-xl">Collect - Build - Fight</h2>
        <button className="z-10 bg-transparent hover:bg-gray-500 text-gray-600 font-semibold hover:text-white mt-12 mb-40 py-2 px-4 border border-gray-500 hover:border-transparent rounded">
          <Link to="/play">
            Try it now for free
          </Link>
        </button>
      </div>
    </div>
  )
};


export default Home;
