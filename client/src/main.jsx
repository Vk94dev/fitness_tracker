
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './redux/store'
import {Provider} from 'react-redux'
import { injectStore } from "./api/api";
injectStore(store);
createRoot(document.getElementById('root')).render(
    
   <Provider store={store}>
    <PersistGate persistor={persistor}>
     
         <App />
    </PersistGate>
   </Provider>
)
