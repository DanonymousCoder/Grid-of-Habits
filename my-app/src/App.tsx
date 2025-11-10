import React from 'react';
import { useState, useEffect } from 'react';
import { Moon, Sun, Trash2, Calendar, TrendingUp, Award, Plus } from 'lucide-react';
import './App.css';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [newHabitClick, setNewHabitClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [expandHabits, setExpandHabits] = useState(false);
  const [count, setCount] = useState(0);
  const [habits, setHabits] = useState<habitType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);


  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habitgrid-habits') || '[]');
    const savedDarkMode = (localStorage.getItem('habitgrid-darkmode') === 'true');

    setHabits(savedHabits);
    setCount(savedHabits.length);
    setDarkMode(savedDarkMode);
    
    if (savedHabits.length > 0) {
      setExpandHabits(true);
    }
    
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('habitgrid-habits', JSON.stringify(habits));
    }
  }, [habits, isInitialized]);


  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('habitgrid-darkmode', darkMode ? 'true' : 'false');
    }
  }, [darkMode, isInitialized]);

  /*
  const habitExample = {
    id: 1234567890,
    name: "Read",
    completedDays: {
      "2025-11-05": true,
      "2025-11-06": true,
      "2025-11-07": true
    }
  };
  */ 

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
        const newCompletedDays = { ...habit.completedDays };

        if (newCompletedDays[date]) {
          delete newCompletedDays[date];
        } else {
          newCompletedDays[date] = true;
        }

        return { ...habit, completedDays: newCompletedDays };
      }

      return habit;
    }));
  };

  const getStreak = (habit: habitType) => {
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    let currentDate = new Date();
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      
      if (habit.completedDays[dateStr]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
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


  const getCellColor = (habit: habitType, date: string) => {
    const isCompleted = habit.completedDays[date];

    if (!isCompleted) {
      return darkMode ? '#1F2937' : '#F3F4F6';
    }

    const streak = getStreak(habit);

    if (streak >= 21) return '#059669';
    if (streak >= 14) return '#10B981';
    if (streak >= 7) return '#34D399';

    return '#6EE7B7';
  }

  const getMonthLabel = (date: string) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Nov', 'Dec'];
    return months[d.getMonth()];
  };

  {
    days.map((date, i) => {
      const showMonth = i === 0 || new Date(date).getDate() === 1;

      return (
        <div key={date} className='month-label'>
          {showMonth && <span>{getMonthLabel(date)}</span>}
        </div>
      )
    })
  }


  return (
    <div className={`container ${darkMode === true ? '' : "container-light"}`}>
      <nav>
        <div className='logo'>
          <h1>Grid Of Habits</h1>
          <p>Build consistency, one day at a time.</p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className='sun' /> : <Moon className='moon' />}
        </button>
      </nav>

      <main>

        <div className={`moreHabitInfo ${expandHabits ? "moreHabitInfo-flex" : ''} ${count ? '' : 'none'}`}>
          <div className='active'>
            <TrendingUp size='3em' />
            <div className='text'>
              <p className='head'>Active Habits</p>
              <p>{count}</p>
            </div>
          </div>
          <div className='tracking'>
            <Calendar size='3em' />

            <div className='text'>
              <p className='head'>Tracking Period</p>
              <p>30Days</p>
            </div>
          </div>
          <div className='streak'>
            <Award size='3em' />

            <div className='text'>
              <p className='head'>Longest Streak</p>
              <p>{habits.length > 0 ? Math.max(...habits.map(h => getStreak(h))) : 0}</p>
            </div>
          </div>
        </ div>

        <div className='habits'>
          <HabitsButton
            newHabitClick={newHabitClick}
            setNewHabitClick={setNewHabitClick}
            inputValue={inputValue}
            setInputValue={setInputValue}
            expandHabits={expandHabits}
            setExpandHabits={setExpandHabits}
            setCount={setCount}
            habits={habits}
            setHabits={setHabits}
             />
        </div>

        <div className={`habits-track ${count ? 'none' : ''}`}>
          <TrendingUp size='10em' />
          <p className='head'>No habits yet</p>
          <p>Add your first habit to start tracking your progress</p>
        </div>

        <div className={`habit-graphs ${expandHabits ? 'unset' : ''}`}>
          {habits.map((habit) => (
            <div className={`habit-graph`}>
            <div className='top'>
              <div className='left'>
                <h5>{habit.name}</h5>
                <p className='streak-p'> Streak: <span>{getStreak(habit)}</span></p>
                <p className='streak-c'>Completion rate: <span>{getCompletedRate(habit)}%</span></p>
              </div>

              <Trash2 className='trash' onClick={() => {
                setHabits(habits.filter(h => h.id !== habit.id))
                // setHideHabitGraph(true);
                setCount(count - 1);
              }} />
            </div>

            <div className='graph-main'>
                  {days.map((date) => {
                const dayOfWeek = new Date(date).getDay();
                const gridRow = (dayOfWeek === 0 ? 7 : dayOfWeek);

                return (
                  <button
                    key={date}
                    onClick={() => toggleDay(habit.id, date)}
                    className='box'
                    style={{ gridRow, backgroundColor: getCellColor(habit, date) }}
                    title={`${date} - ${habit.completedDays[date] ? 'Completed' : 'Not completed'}`}
                  />
                )
              })}
            </div>
          </div>
          ))}
        </div>

        <footer>
          <p>Consistency is key. Track your habits daily and watch your streaks grow.</p>
        </footer>
      </main>

    </div>
  );
};


type habitType = {
  id: number;
  name: string;
  completedDays: { [date: string]: boolean };
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

const HabitsButton: React.FC<HabitsButtonProps> = ({ newHabitClick, setNewHabitClick, inputValue, setInputValue, expandHabits, setExpandHabits, setCount, habits, setHabits}) => {
  return !newHabitClick ? <button className='new-habits' onClick={() => setNewHabitClick(true)}><Plus /> Add new Habits</button>
    : <InputHabit setNewHabitClick={setNewHabitClick} inputValue={inputValue} setInputValue={setInputValue} expandHabits={expandHabits} setExpandHabits={setExpandHabits} setCount={setCount} habits={habits} setHabits={setHabits} />;
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
      setNewHabitClick(false);
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
        value={inputValue}
        onChange={(e)=> setInputValue(e.target.value)}
        onKeyDown = {e => {
          if(e.key === 'Enter') {
            handleAddHabit();
          }
        }} />
      <button className='add-btn' onClick={handleAddHabit}>Add</button>
      <button className='cancel-input' onClick={() => setNewHabitClick(false)}>Cancel</button>
    </div>
  )
}

export default App;