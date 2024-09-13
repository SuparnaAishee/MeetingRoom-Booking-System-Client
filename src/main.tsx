import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'
import { Provider } from 'react-redux'
import { store,persistor }  from './hooks/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
// import { Provider } from 'react-redux'
// import { store } from './hooks/store.ts'
// import App from './App.tsx'
import { Toaster } from 'sonner'; 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
     <Toaster/>
    </Provider>
  </React.StrictMode>
);
