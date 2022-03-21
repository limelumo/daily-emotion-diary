import { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App.js';

import DiaryHeader from './DiaryHeader';
import DiaryButton from './DiaryButton';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion.js';

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();

  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleClickEmotion = (emotion) => {
    setEmotion(emotion);
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate('/', { replace: true });
  };

  useEffect(() => {
    // New.js가 아닌 Edit.js에서만 작동하도록
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <DiaryHeader
        headText={isEdit ? '일기 수정하기' : '새 일기 작성'}
        leftChild={
          <DiaryButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />
        }
      />

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>

        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>

        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>

        <section>
          <div className="control_box">
            <DiaryButton text={'취소하기'} onClick={() => navigate(-1)} />
            <DiaryButton
              text={'작성하기'}
              type={'positive'}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
