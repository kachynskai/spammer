import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactsPage from './pages/ContactsPage';
import NewContactPage from './pages/NewContactPage';
import EditContactPage from './pages/EditContactPage';
import EmailPage from './pages/EmailPage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ContactsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/new" element={<NewContactPage />} />
          <Route path="/edit/:id" element={<EditContactPage />} />
          <Route path="/send" element={<EmailPage />} />
        </Routes>
      </Router>
  );
};


export default App;
