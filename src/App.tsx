import { Navigate, Route, Routes } from 'react-router-dom'
import { LeadRescuePage } from './pages/LeadRescuePage'

export function App() {
  return (
    <Routes>
      <Route path="/leadrescue-ai" element={<LeadRescuePage />} />
      <Route path="*" element={<Navigate to="/leadrescue-ai" replace />} />
    </Routes>
  )
}
