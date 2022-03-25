import { useRef, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from '../App.js';

import DiaryHeader from './DiaryHeader';
import DiaryButton from './DiaryButton';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion.js';

const DiaryEditor = ({ isEdit, originData }) => {
  const oneLineRef = useRef();
  const contentRef = useRef();

  const [content, setContent] = useState('');
  const [oneLine, setOneLine] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (oneLine.length < 1) {
      oneLineRef.current.focus();
      return;
    } else if (content.length < 1) {
      contentRef.current.focus();
      return;
    } else {
      submitContent();
    }
  };

  const submitContent = () => {
    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?'
      )
    ) {
      if (!isEdit) {
        onCreate(date, oneLine, content, emotion);
      } else {
        onEdit(originData.id, date, oneLine, content, emotion);
      }
    }
    navigate('/', { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    // New.js가 아닌 Edit.js에서만 작동하도록
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setOneLine(originData.oneLine);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <DiaryHeader
        headText={isEdit ? '일기 수정하기' : date}
        leftChild={
          isEdit && (
            <DiaryButton text={'뒤로가기'} onClick={() => navigate(-1)} />
          )
        }
        rightChild={
          isEdit && (
            <DiaryButton
              text={'삭제하기'}
              type={'negative'}
              onClick={handleRemove}
            />
          )
        }
      />

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <input
            className="input_date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
        </section>

        <section>
          <h4>오늘을 한 문장으로 나타낸다면?</h4>
          <input
            type="text"
            className="input_oneline"
            ref={oneLineRef}
            value={oneLine}
            onChange={(e) => setOneLine(e.target.value)}
          />
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
              placeholder="오늘 하루는 어땠나요?"
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
