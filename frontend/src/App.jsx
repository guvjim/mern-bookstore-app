// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import ShowBook from './pages/ShowBook';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/show/:id' element={<ShowBook />} />
    </Routes>

  )
}

export default App
