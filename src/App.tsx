import { Navigate, Route, Routes } from 'react-router-dom'
import { ExamplesPage } from './pages/ExamplesPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { IndustriesPage } from './pages/IndustriesPage'
import { LeadRescueAppPage } from './pages/LeadRescueAppPage'
import { LeadRescuePage } from './pages/LeadRescuePage'

export function App() {
  return (
    <Routes>
      <Route path="/leadrescue-ai" element={<LeadRescuePage />} />
      <Route path="/leadrescue-ai/how-it-works" element={<HowItWorksPage />} />
      <Route path="/leadrescue-ai/industries" element={<IndustriesPage />} />
      <Route path="/leadrescue-ai/examples" element={<ExamplesPage />} />
      <Route path="/leadrescue-ai/app" element={<LeadRescueAppPage />} />
      <Route path="*" element={<Navigate to="/leadrescue-ai" replace />} />
    </Routes>
  )
}
