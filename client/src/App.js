import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './views/Main'
import EditNote from './components/EditNote';
import RandomNote from './components/RandomNote'
import NoteForm from './components/NoteForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route element = {<Main/>} path="/" default />
            <Route element={<NoteForm />} path="/note/create" />
            <Route element = {<EditNote />} path = "/note/edit/:id" />
            <Route element={<RandomNote />} path="/note/random" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
