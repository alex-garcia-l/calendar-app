import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouters } from './routers/AppRouters';

const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouters />
    </Provider>
  );
};

export default CalendarApp;
