import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Home from './components/Home'
import Deck from './components/Deck'
import Overview from './components/Overview'
import Content from './components/Content'

// `/:sessionId` with no slide → jump to the first slide of that deck.
function DeckIndexRedirect() {
  const { sessionId } = useParams()
  return <Navigate to={`/${sessionId}/1`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:sessionId" element={<DeckIndexRedirect />} />
      <Route path="/:sessionId/overview" element={<Overview />} />
      <Route path="/:sessionId/content" element={<Content />} />
      <Route path="/:sessionId/:slideId" element={<Deck />} />
    </Routes>
  )
}
