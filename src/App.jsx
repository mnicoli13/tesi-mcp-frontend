import { AuthProvider } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        <AppRoutes />
      </InterviewProvider>
    </AuthProvider>
  );
}
