import header from './panel grande.png';
import {FormattedMessage} from 'react-intl' ;
function NavBar() {
    return (
      <>
        <h1> <FormattedMessage id="Adopt a Robot with Robot Lovers!"/></h1>
        <img src={header} alt="Robots Header" />
      </>
    );
   }
   
   export default NavBar;