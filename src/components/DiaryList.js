import { useState } from 'react';

const sortOptionList = [
  { value: 'latest', name: '최신순' },
  { value: 'oldest', name: '오래된순' },
];

const filterOptionList = [
  { value: 'all', name: '모든 감정' },
  { value: 'good', name: '좋은 감정' },
  { value: 'bad', name: '안좋은 감정' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  // 정렬기능
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessdDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // sort를 위한 비교 함수
    const compare = (a, b) => {
      if (sortType === 'latest') {
        // 문자열이 들어올 수 있기에 형 변환
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // diaryList deep copy
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallback(it));

    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      {getProcessdDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
