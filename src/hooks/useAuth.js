import {useSelector} from 'react-redux';
import {selectIsLoggedin, selectUser,} from '../redux/auth/authSelectors';

export const useAuth = () => {
    const isLoggedin = useSelector(selectIsLoggedin);
      const user = useSelector(selectUser);

    return {
        isLoggedin,
         user,
    };
};