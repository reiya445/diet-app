import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import GoalSetting from './pages/GoalSetting';
import PenaltySetting from './pages/PenaltySetting';
import RewardSetting from './pages/RewardSetting';
import CalorieCounter from './pages/CalorieCounter';
import CalorieHistory from './pages/CalorieHistory';
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
  const [resultKind, setResultKind] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  // =========================
  // LocalStorageから読み込み
  // =========================
  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    const savedPenalties = localStorage.getItem('penalties');
    const savedRewards = localStorage.getItem('rewards');

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }

    if (savedPenalties) {
      setPenalties(JSON.parse(savedPenalties));
    }

    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    }
  }, []);

  // =========================
  // LocalStorageへ保存
  // =========================
  useEffect(() => {
    localStorage.setItem(
      'goals',
      JSON.stringify(goals)
    );
  }, [goals]);

  useEffect(() => {
    localStorage.setItem(
      'penalties',
      JSON.stringify(penalties)
    );
  }, [penalties]);

  useEffect(() => {
    localStorage.setItem(
      'rewards',
      JSON.stringify(rewards)
    );
  }, [rewards]);

  // =========================
  // 目標
  // =========================
  const addGoal = (type, title) => {
    setGoals(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        title
      }
    }));
  };

  const toggleGoal = (type) => {
    setGoals(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        completed: !prev[type].completed
      }
    }));
  };

  // =========================
  // ご褒美・罰ゲーム
  // =========================
  const handleGoalResult = (isCompleted) => {
    if (isCompleted) {
      const randomReward =
        rewards[Math.floor(Math.random() * rewards.length)];

      setResultKind('reward');

      setResultMessage(
        `ご褒美 — ${
          randomReward || 'ご褒美を設定してください'
        }`
      );
    } else {
      const randomPenalty =
        penalties[Math.floor(Math.random() * penalties.length)];

      setResultKind('penalty');

      setResultMessage(
        `罰ゲーム — ${
          randomPenalty || '罰ゲームを設定してください'
        }`
      );
    }
  };

  const clearResult = () => {
    setResultMessage('');
    setResultKind(null);
  };

  // =========================
  // 罰ゲーム
  // =========================
  const addPenalty = (penalty) => {
    setPenalties(prev => [
      ...prev,
      penalty
    ]);
  };

  const deletePenalty = (index) => {
    setPenalties(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // ご褒美
  // =========================
  const addReward = (reward) => {
    setRewards(prev => [
      ...prev,
      reward
    ]);
  };

  const deleteReward = (index) => {
    setRewards(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  // =========================
  // ページ
  // =========================
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
            onNavigate={setCurrentPage}
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
            deletePenalty={deletePenalty}
            onBack={() => setCurrentPage('home')}
          />
        );

      case 'rewardSetting':
        return (
          <RewardSetting
            rewards={rewards}
            addReward={addReward}
            deleteReward={deleteReward}
            onBack={() => setCurrentPage('home')}
          />
        );

      case 'calorieCounter':
        return (
          <CalorieCounter
            onBack={() => setCurrentPage('home')}
            onNext={() => setCurrentPage('mealCamera')}
            onNavigate={setCurrentPage}
          />
        );

      case 'calorieHistory':
        return (
          <CalorieHistory
            onBack={() =>
              setCurrentPage('calorieCounter')
            }
          />
        );

      case 'mealCamera':
        return (
          <MealCamera
            onBack={() =>
              setCurrentPage('calorieCounter')
            }
            onNext={(data) => {
              console.log(
                'App受信:',
                data
              );

              setAnalysis(data);

              setCurrentPage(
                'mealResult'
              );
            }}
          />
        );

      case 'mealResult':
        return (
          <MealResult
            analysis={analysis}
            onBack={() =>
              setCurrentPage('mealCamera')
            }
          />
        );

      default:
        return (
          <Home
            goals={goals}
            toggleGoal={toggleGoal}
            handleGoalResult={handleGoalResult}
            resultMessage={resultMessage}
            resultKind={resultKind}
            clearResult={clearResult}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="app-root">
      {renderPage()}
    </div>
  );
}

export default App;