import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../types/state';
import { сhangeSelectedCity, Actions } from '../../store/actions';
import { appCityNames } from '../../consts';

type LocationsListProps = {
  selectedCity: string;
  handleCityClick: (city: string) => void;
}

const mapStateToProps = ({ selectedCity }: State) => ({
  selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  handleCityClick(city: string) {
    dispatch(сhangeSelectedCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

function LocationLists({ selectedCity, handleCityClick }: LocationsListProps): JSX.Element {

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

export { LocationLists };
export default connector(LocationLists);

