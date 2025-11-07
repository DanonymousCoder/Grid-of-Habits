import React from 'react';
import {useState} from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [newHabitClick, setNewHabitClick] = useState(false);
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');
  const [inputValue, setInputValue] = useState("");

  const habitExample = {
    id: 1234567890,
    name: "Read",
    completedDays: {
      "2025-11-05": true,
      "2025-11-06": true,
      "2025-11-07": true
    }
  };

  const addhabit = () => {}

  const getLast30Days = () => {
    const days = [];

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }

    return days;
  }

  const days = getLast30Days();

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
          setNewHabitClick = {setNewHabitClick}
          inputValue = {inputValue}
          setInputValue = {setInputValue} />
       </div>

       <div className='habits-track'>
        <img />
        <p className='head'>No habits yet</p>
        <p>Add your first habit to start tracking your progress</p>
       </div>

       <footer>
        <p>Consistency is key. Track your habits daily and watch your streaks grow.</p>
       </footer>
      </main>
      
    </div>
  );
}


type HabitsButtonProps = {
  newHabitClick: boolean;
  setNewHabitClick: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const HabitsButton: React.FC<HabitsButtonProps> = ({newHabitClick, setNewHabitClick, inputValue, setInputValue}) => {
  return  !newHabitClick ? <button className='new-habits' onClick={() => setNewHabitClick(true)}><span>+</span> Add new Habits</button> 
  : <InputHabit setNewHabitClick = {setNewHabitClick} value = {inputValue} onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} /> ;
};


type InputHabitProps = {
  setNewHabitClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputHabit: React.FC<InputHabitProps> = ({ setNewHabitClick }) => {
  return (
    <div className='input-habit'>
      <input placeholder='Enter habit name (e.g, Read, Exercise, Meditate)' />
      <button className='add-btn'>Add</button>
      <button className = 'cancel-input' onClick={() => setNewHabitClick(false)}>Cancel</button>
    </div>
  )
}

export default App;