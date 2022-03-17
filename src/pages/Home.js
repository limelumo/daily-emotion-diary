import { useState } from 'react';

import DiaryHeader from './../components/DiaryHeader';
import DiaryButton from './../components/DiaryButton';

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <DiaryHeader
        headText={headText}
        leftChild={<DiaryButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<DiaryButton text={'>'} onClick={increaseMonth} />}
      />
    </div>
  );
};

export default Home;
