import { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { State } from '../../store/root-reducer';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const dispatch = useDispatch();
  const headerProps = useSelector((state: State) => {
    return {
      authorizationStatus: state.USER.authorizationStatus,
      userData: state.USER.userData,
    };
  });

  const handleLogoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const { authorizationStatus, userData: { email, avatarUrl } } = headerProps;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink to={AppRoute.Root} className={'header__logo-link header__logo-link--active'}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </NavLink>
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ?
              (<ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink to={AppRoute.Favorites} className={'header__nav-link header__nav-link--profile'}>
                    <div className="header__avatar-wrapper user__avatar-wrapper" style={{
                      backgroundImage: `url(${avatarUrl})`
                    }}>
                    </div>
                    <span className="header__user-name user__name">{email}</span>
                  </NavLink>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>) :
              (<ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink to={AppRoute.Login} className={'header__nav-link header__nav-link--profile'}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </NavLink>
                </li>
              </ul>)
            }
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
