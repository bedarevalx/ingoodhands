import React from 'react';
import MapComponent from '../components/MapComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../App';
import UserInfo from '../components/UserInfo';
function User() {
  const [mapCoords, setMapCoords] = React.useState([]);
  const [addressInput, setAddressInput] = React.useState('');
  const navigate = useNavigate();
  const changeInputAddress = (e) => {
    setAddressInput(e.target.value);
    searchAddress();
  };

  const searchAddress = () => {
    axios
      .post(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        { query: addressInput, bounds: 'city' },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Token d87c5245042b464e3ed4e009e8cd85d645b20c1a',
          },
        },
      )
      .then((res) => {
        console.log(res.data.suggestions);
        let findedAddress = res.data.suggestions[0].data;
        console.log(res.data.suggestions[0].value);
        setMapCoords([findedAddress?.geo_lat, findedAddress?.geo_lon]);
      });
  };

  return (
    // <div className='wrapper'>
    //   {mapCoords.length > 0 ? <MapComponent coords={mapCoords} /> : null}
    //   <input
    //     placeholder='Введите Адресс'
    //     onChange={(e) => changeInputAddress(e)}
    //   />
    // </div>
    <UserInfo />
  );
}

export default User;
