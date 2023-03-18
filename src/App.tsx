import React from 'react';
import {Header} from "./Components/layout/Header";
import {AddShoppingList} from "./Components/AddShoppingList/AddShoppingList";

import "./App.css";

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <AddShoppingList/>
        </div>
    );
}

export default App;
