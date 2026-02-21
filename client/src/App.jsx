import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useApp } from './context/AppContext.jsx';
import Layout from './components/Layout/Layout.jsx';
import Login from './components/Auth/Login.jsx';
import DataManager from './components/Settings/DataManager.jsx';
import StudyPlan from './components/StudyPlan/StudyPlan.jsx';
import FlashcardView from './components/Flashcards/FlashcardView.jsx';
import BlindsToBytes from './components/BlindsToBytes/BlindsToBytes.jsx';
import LabView from './components/Labs/LabView.jsx';
import QuizView from './components/Quiz/QuizView.jsx';
import MockInterview from './components/MockInterview/MockInterview.jsx';
import ScenariosView from './components/Scenarios/ScenariosView.jsx';
import ProgressDashboard from './components/Progress/ProgressDashboard.jsx';

export default function App() {
  const { state, dispatch } = useApp();

  if (state.authChecking) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <Loader2 size={32} className="text-workshop-400 animate-spin" />
      </div>
    );
  }

  if (!state.isAuthenticated) {
    return (
      <Login
        onLogin={(username) =>
          dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, username } })
        }
      />
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StudyPlan />} />
        <Route path="/section/:sectionId" element={<StudyPlan />} />
        <Route path="/flashcards/:sectionId?" element={<FlashcardView />} />
        <Route path="/blinds-to-bytes/:sectionId?" element={<BlindsToBytes />} />
        <Route path="/lab/:labId" element={<LabView />} />
        <Route path="/quiz/:sectionId" element={<QuizView />} />
        <Route path="/interview/:type?" element={<MockInterview />} />
        <Route path="/scenarios" element={<ScenariosView />} />
        <Route path="/progress" element={<ProgressDashboard />} />
        <Route path="/settings" element={<DataManager />} />
      </Routes>
    </Layout>
  );
}
