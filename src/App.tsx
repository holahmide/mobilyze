import './App.css';
import { ListOutlinedIcon, MapIcon } from './assets/icons';
import Details from './components/Details';
import Map from './components/Map';
import { useGlobalContext } from './context';

function App() {
  const {
    state: { showMobileListContainer },
    dispatch
  } = useGlobalContext();

  const toggleMobileDetailsView = () => {
    dispatch({ type: 'TOGGLE_MOBILE_LIST' });
  };

  return (
    <div id="app" className="container">
      <div className="map-container">
        <Map />
      </div>

      <div
        className={`details-container ${showMobileListContainer ? 'mobile-details-container' : ''}`}
      >
        <Details />
      </div>

      <div className="mobile-menu-container" onClick={toggleMobileDetailsView}>
        {showMobileListContainer ? <MapIcon /> : <ListOutlinedIcon className="icon" />}
      </div>
    </div>
  );
}

export default App;
