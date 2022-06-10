import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useState, useEffect } from 'react';
import { changeSortType, Actions } from '../../store/actions';
import { State } from '../../types/state';
import { SortType } from '../../consts';

type SortProps = {
  currentSortType: string,
  handleSortClick: (sort: string) => void,
}

const mapStateToProps = ({ currentSortType }: State) => ({
  currentSortType,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  handleSortClick(sort: string) {
    dispatch(changeSortType(sort));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

function Sort({ currentSortType, handleSortClick }: SortProps): JSX.Element {
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState(false);

  const sortTypes = Object.values(SortType);

  useEffect(() => {
    const handleClick = () => {
      if (sortMenuIsOpen) {
        setSortMenuIsOpen(false);
      }
    };
    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && sortMenuIsOpen) {
        setSortMenuIsOpen(false);
      }
    };

    if (sortMenuIsOpen) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEscPress);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscPress);
    };
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => { setSortMenuIsOpen(!sortMenuIsOpen); }} >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {sortMenuIsOpen &&
      <ul className="places__options places__options--custom places__options--opened">
        {sortTypes.map((sortType) => (
          <li className={`places__option ${currentSortType === sortType ? 'places__option--active' : ''}`} tabIndex={0} key={sortType} onClick={() => {
            handleSortClick(sortType);
          }}
          >{sortType}
          </li>
        ))}
      </ul>}
    </form>
  );
}

export { Sort };
export default connector(Sort);
