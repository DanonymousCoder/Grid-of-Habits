import React from 'react';
import {useState} from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

function App() {

  const [newHabitClick, setNewHabitClick] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`container ${darkMode === true ? '' : "container-light"}`}>
      <nav>
        <div className='logo'>
          <h1>Grid Of Habits</h1>
          <p>Build consistency, one day at a time.</p>
        </div>
        
        <button
          onClick= {() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className='sun' /> : <Moon className='moon' />}
        </button>
      </nav>

      <main>
       <div className='habits'>
        <HabitsButton 
          newHabitClick = {newHabitClick}
          setNewHabitClick = {setNewHabitClick} />
       </div>
      </main>
      
    </div>
  );
}


type HabitsButtonProps = {
  newHabitClick: number;
  setNewHabitClick: React.Dispatch<React.SetStateAction<number>>;
};

const HabitsButton: React.FC<HabitsButtonProps> = ({newHabitClick, setNewHabitClick}) => {
  return <button className='new-habits'>Add new Habits</button>;
};

export default App;