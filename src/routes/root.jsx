import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

function Root(props) {
  return (
    <>
     <Header 
        isSession={props.token} 
        onLogout={props.onLogout} 
        onLogin={() => console.log('Inicia sesión')}
      />
      <div className="container-fluid mt-5" id="todos-app">
        <div className="container tasks">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Root;