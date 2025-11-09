import React from 'react';
import {useState} from 'react';
import { Moon, Sun, Trash2, Calendar, TrendingUp, Award } from 'lucide-react';
import './App.css';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [newHabitClick, setNewHabitClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [expandHabits, setExpandHabits] = useState(false);
  const [count, setCount] = useState(0);
  const [hideHabitGraph, setHideHabitGraph] = useState(false);
  const [habits, setHabits] = useState<habitType[]>([]);

  const habitExample = {
    id: 1234567890,
    name: "Read",
    completedDays: {
      "2025-11-05": true,
      "2025-11-06": true,
      "2025-11-07": true
    }
  };

  const getLast30Days = () => {
    const days = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }

    return days;
  };

  const days = getLast30Days();

  const toggleDay = (habitId: number, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompletedDays = { ...habit.completedDays};

        if (newCompletedDays[date]) {
          delete newCompletedDays[date];
        } else {
          newCompletedDays[date] = true;
        }

        return {...habit, completedDays: newCompletedDays};
      }

      return habit;
    }));
  };

 const getStreak = (habit: habitType) => {
    let streak = 0;

    for (let i = 0; i < days.length; i++) {
      const date = days[(days.length - 1) - i ];

      if (habit.completedDays[date]) {
        streak ++;
      } else {
        break;
      }
    }

    return streak;
  };

  const getCompletedRate = (habit: habitType) => {
    const completed = Object.keys(habit.completedDays).length;
    return Math.round((completed / days.length) * 100);
  }


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

      <div className={`moreHabitInfo ${expandHabits ? "moreHabitInfo-flex" : ''} ${count ? '' : 'none' }`}>
        <div className='active'>
          <TrendingUp />
          <div className='text'>
            <p className='head'>Active Habits</p>
            <p>{count}</p>
          </div>
        </div>
        <div className='tracking'>
          <Calendar />

          <div className='text'>
            <p className='head'>Tracking Period</p>
            <p>30Days</p>
          </div>
        </div>
        <div className='streak'>
          <Award />

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
          setCount = {setCount}
          habits = {habits}
          setHabits = {setHabits} />
       </div>

       <div className={`habits-track ${count ? 'none' : ''}`}>
        <TrendingUp />
        <p className='head'>No habits yet</p>
        <p>Add your first habit to start tracking your progress</p>
       </div>

       <div className={`habit-graphs ${expandHabits ? 'unset' : ''}`}>
          <div className={`habit-graph ${hideHabitGraph ? 'none' : ''}`}>
            <div className='top'>
              <div className='left'>
              <h5>{inputValue}</h5>
              <p className='streak-p'> Streak: <span>{habits.length > 0 ? getStreak(habits[habits.length - 1]) : 0}</span></p>
              <p className='streak-c'>Completion rate: <span>{habits.length > 0 ? getCompletedRate(habits[habits.length -1]): 0}%</span></p>
            </div>

            <Trash2 className='trash' onClick={() => {
              setHideHabitGraph(true);
              setCount(count - 1);
            }}  />
            </div>

            <div className='graph-main'>
              <div className='days'>
                <p>M</p>
                <p>T</p>
                <p>W</p>
                <p>T</p>
                <p>F</p>
                <p>S</p>
                <p>S</p>
              </div>
              <div className='boxes'>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
                <div className='box'></div>
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
       </div>

       <footer>
        <p>Consistency is key. Track your habits daily and watch your streaks grow.</p>
       </footer>
      </main>
      
    </div>
  );
}


type habitType = {
  id: number;
  name: string;
  completedDays: {[date : string] : boolean};
}

type HabitsButtonProps = {
  newHabitClick: boolean;
  setNewHabitClick: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  expandHabits: boolean;
  setExpandHabits: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  habits: habitType[];
  setHabits: React.Dispatch<React.SetStateAction<habitType[]>>;
};

const HabitsButton: React.FC<HabitsButtonProps> = ({newHabitClick, setNewHabitClick, inputValue, setInputValue, expandHabits, setExpandHabits, setCount, habits, setHabits}) => {
  return  !newHabitClick ? <button className='new-habits' onClick={() => setNewHabitClick(true)}><span>+</span> Add new Habits</button> 
  : <InputHabit setNewHabitClick = {setNewHabitClick} inputValue = {inputValue} setInputValue = {setInputValue} expandHabits = {expandHabits} setExpandHabits = {setExpandHabits} setCount = {setCount} habits = {habits} setHabits = {setHabits} /> ;
};


type InputHabitProps = {
  setNewHabitClick: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setExpandHabits: React.Dispatch<React.SetStateAction<boolean>>;
  expandHabits: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  habits: habitType[];
  setHabits: React.Dispatch<React.SetStateAction<habitType[]>>;
};

const InputHabit: React.FC<InputHabitProps> = ({ setNewHabitClick, setInputValue, inputValue, setExpandHabits, setCount, habits, setHabits }) => {

  const handleAddHabit = () => {
    if (inputValue.trim()) {
      setCount(prev => prev + 1);

      const newHabit = {
        id: Date.now(),
        name: inputValue.trim(),
        completedDays: {},
      }

      setHabits([...habits, newHabit]);
      setInputValue('');
      setExpandHabits(true);
    }

    /* 
    const habit = document.createElement("div");
    const habitName = document.createElement("p");
    habitName.textContent = inputValue;

    habit.appendChild(habitName);
    
    setCount(prev => prev + 1);
    if (inputValue !== '') setExpandHabits(true);
    */
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