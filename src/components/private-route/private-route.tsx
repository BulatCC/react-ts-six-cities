import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../consts';

const authorizationStatus = true;

type JsxEl = {
  privateElement: JSX.Element
}

function PrivateRoute({privateElement}:JsxEl): JSX.Element {
  return (
    authorizationStatus ? privateElement : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
