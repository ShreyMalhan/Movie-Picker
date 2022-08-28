import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './component/Header'
import Search from './component/Search';
import './app.css'

const App = () => {
    return (
        <>
        <Header />
        <Search /></>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);