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
  const [value, setValue] = useState("");
  const [expandHabits, setExpandHabits] = useState(false);
  const [count, setCount] = useState(0);

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

      <div className={`moreHabitInfo ${expandHabits ? "moreHabitInfo-flex" : ''}`}>
        <div className='active'>
          <img />
          <div className='text'>
            <p className='head'>Active Habits</p>
            <p>{count}</p>
          </div>
        </div>
        <div className='tracking'>
          <img />

          <div className='text'>
            <p className='head'>Tracking Period</p>
            <p>30Days</p>
          </div>
        </div>
        <div className='streak'>
          <img />

          <div className='text'>
            <p className='head'>Longest Streak</p>
            <p>1</p>
          </div>
        </div>
      </ div>

       <div className='habits'>
        <HabitsButton 
          newHabitClick = {newHabitClick}
          setNewHabitClick = {setNewHabitClick}
          inputValue = {inputValue}
          setInputValue = {setInputValue}
          expandHabits = {expandHabits}
          setExpandHabits = {setExpandHabits}
          setCount = {setCount} />
       </div>

       <div className='habits-track'>
        <img />
        <p className='head'>No habits yet</p>
        <p>Add your first habit to start tracking your progress</p>
       </div>

       <div className='habit-graphs'>
          <div className='habit-graph'>
            <div className='left'>
              <h5>Habit Name</h5>
              <p className='streak-p'> Streak: <span>0</span></p>
              <p className='streak-c'>Completion rate: <span>0.00%</span></p>
            </div>

            <div className='graph-main'>
              <div className='box'></div>
              <div className='box'></div>
              <div className='box'></div>
              <div className='box'></div>
              <div className='box'></div>
              <div className='box'></div>
              <div className='box'></div>
            </div>
          </div>
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
  expandHabits: boolean;
  setExpandHabits: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const HabitsButton: React.FC<HabitsButtonProps> = ({newHabitClick, setNewHabitClick, inputValue, setInputValue, expandHabits, setExpandHabits, setCount}) => {
  return  !newHabitClick ? <button className='new-habits' onClick={() => setNewHabitClick(true)}><span>+</span> Add new Habits</button> 
  : <InputHabit setNewHabitClick = {setNewHabitClick} inputValue = {inputValue} setInputValue = {setInputValue} expandHabits = {expandHabits} setExpandHabits = {setExpandHabits} setCount = {setCount} /> ;
};


type InputHabitProps = {
  setNewHabitClick: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setExpandHabits: React.Dispatch<React.SetStateAction<boolean>>;
  expandHabits: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const InputHabit: React.FC<InputHabitProps> = ({ setNewHabitClick, setInputValue, inputValue, setExpandHabits, setCount }) => {

  const handleAddHabit = () => {
    const habit = document.createElement("div");
    const habitName = document.createElement("p");
    habitName.textContent = inputValue;

    habit.appendChild(habitName);

    console.log(habit);

    setExpandHabits(true);
    setCount(prev => prev + 1);
  }

  return (
    <div className='input-habit'>
      <input placeholder='Enter habit name (e.g, Read, Exercise, Meditate)' 
      value = {inputValue}
      onChange={e =>setInputValue(e.target.value) } />
      <button className='add-btn' onClick = {handleAddHabit}>Add</button>
      <button className = 'cancel-input' onClick={() => setNewHabitClick(false)}>Cancel</button>
    </div>
  )
}

export default App;