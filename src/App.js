import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

// COMPONENTS
import DiaryButton from './components/DiaryButton';
import DiaryHeader from './components/DiaryHeader';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <DiaryHeader
          headText={'App'}
          leftChild={
            <DiaryButton
              text={'왼쪽 버튼'}
              onClick={() => alert('왼쪽버튼 클릭')}
            />
          }
          rightChild={
            <DiaryButton
              text={'오른쪽 버튼'}
              onClick={() => alert('오른버튼 클릭')}
            />
          }
        />

        <DiaryButton
          text={'버튼'}
          onClick={() => alert('버튼클릭')}
          type={'positive'}
        />

        <DiaryButton
          text={'버튼'}
          onClick={() => alert('버튼클릭')}
          type={'negative'}
        />

        <DiaryButton text={'버튼'} onClick={() => alert('버튼클릭')} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
