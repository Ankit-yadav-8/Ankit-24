import { Routes, Route } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll.jsx'
import Layout from './components/layout/Layout.jsx'
import Cursor from './components/ui/Cursor.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'

import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import CaseStudyDetail from './pages/CaseStudyDetail.jsx'
import Portfolio from './pages/Portfolio.jsx'
import About from './pages/About.jsx'
import Resources from './pages/Resources.jsx'
import ResourceDetail from './pages/ResourceDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <Cursor />
      <ScrollProgress />
      <div className="grain" />
      <div className="app">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="about" element={<About />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:slug" element={<ResourceDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </SmoothScroll>
  )
}
