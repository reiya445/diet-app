import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import GoalSetting from './pages/GoalSetting';
import PenaltySetting from './pages/PenaltySetting';
import RewardSetting from './pages/RewardSetting';
import CalorieCounter from './pages/CalorieCounter';
import MealCamera from './pages/MealCamera';
import MealResult from './pages/MealResult';



function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [goals, setGoals] = useState({
    today: { title: '', completed: false },
    week: { title: '', completed: false },
    month: { title: '', completed: false }
  });
  const [penalties, setPenalties] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  // 'reward' | 'penalty' | null — 判定パネルの配色を出し分けるために持つ
  const [resultKind, setResultKind] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  // ローカルストレージから데이터를 읽み込む
  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    const savedPenalties = localStorage.getItem('penalties');
    const savedRewards = localStorage.getItem('rewards');
    
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedPenalties) setPenalties(JSON.parse(savedPenalties));
    if (savedRewards) setRewards(JSON.parse(savedRewards));
  }, []);

  // 데이터를 저장
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('penalties', JSON.stringify(penalties));
  }, [penalties]);

  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  const addGoal = (type, title) => {
    setGoals(prev => ({
      ...prev,
      [type]: { ...prev[type], title }
    }));
  };

  const toggleGoal = (type) => {
    setGoals(prev => ({
      ...prev,
      [type]: { ...prev[type], completed: !prev[type].completed }
    }));
  };

  const handleGoalResult = (isCompleted) => {
    if (isCompleted) {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setResultKind('reward');
      setResultMessage(`ご褒美 — ${randomReward || 'ご褒美を設定してください'}`);
    } else {
      const randomPenalty = penalties[Math.floor(Math.random() * penalties.length)];
      setResultKind('penalty');
      setResultMessage(`罰ゲーム — ${randomPenalty || '罰ゲームを設定してください'}`);
    }
  };

  const clearResult = () => {
    setResultMessage('');
    setResultKind(null);
  };

  const addPenalty = (penalty) => {
    setPenalties([...penalties, penalty]);
  };

  const addReward = (reward) => {
    setRewards([...rewards, reward]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':

return (
  <Home
    goals={goals}
    toggleGoal={toggleGoal}
    handleGoalResult={handleGoalResult}
    resultMessage={resultMessage}
    resultKind={resultKind}
    clearResult={clearResult}

    onNavigate={(page) => {
      setCurrentPage(page);
    }}

  />
);
      case 'goalSetting':
        return (
          <GoalSetting
            goals={goals}
            addGoal={addGoal}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'penaltySetting':
        return (
          <PenaltySetting
            penalties={penalties}
            addPenalty={addPenalty}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'rewardSetting':
        return (
          <RewardSetting
            rewards={rewards}
            addReward={addReward}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'calorieCounter':
        return (
          <CalorieCounter
            onBack={() => setCurrentPage('home')}
            onNext={() => setCurrentPage("mealCamera")}
          />
        );
      case "mealCamera":

return (

  <MealCamera

    onBack={() =>
      setCurrentPage("calorieCounter")
    }


    onNext={(data)=>{


      console.log(
        "App受信:",
        data
      );


      setAnalysis(data);


      setCurrentPage(
        "mealResult"
      );


    }}

  />

);

case "mealResult":

return (

  <MealResult

    analysis={analysis}

    onBack={() =>
      setCurrentPage("mealCamera")
    }

  />

);
      default:
        return <Home goals={goals} toggleGoal={toggleGoal} handleGoalResult={handleGoalResult} resultMessage={resultMessage} resultKind={resultKind} clearResult={clearResult} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-root">
      {renderPage()}
    </div>
  );
}

export default App;