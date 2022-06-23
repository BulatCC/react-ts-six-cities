import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store/root-reducer';
import { actionCreator } from '../../store/actions';
import { appCityNames } from '../../consts';

function LocationLists(): JSX.Element {
  const selectedCity = useSelector((state: State): string => state.DATA.selectedCity);
  const dispatch = useDispatch();
  const handleCityClick = (city: string) => dispatch(actionCreator.сhangeSelectedCity(city));

  return (
    <ul className="locations__list tabs__list">
      {appCityNames.map((city) => (
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`} href="#" onClick={(evt) => {
            evt.preventDefault();
            handleCityClick(city);
          }}
          ><span>{city}</span>
          </a>
        </li>
      ),
      )}
    </ul>
  );
}

export default LocationLists;
