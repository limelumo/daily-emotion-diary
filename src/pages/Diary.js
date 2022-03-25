import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DiaryStateContext } from '../App';
import DiaryButton from '../components/DiaryButton';
import DiaryHeader from '../components/DiaryHeader';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion.js';

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion Diary, diary ${id + 1}`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert('존재하지 않는 일기입니다');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩 중입니다</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );

    return (
      <div className="DiaryPage">
        <DiaryHeader
          headText={`${getStringDate(new Date(data.date))}의 기록`}
          leftChild={
            <DiaryButton text={'뒤로가기'} onClick={() => navigate(-1)} />
          }
          rightChild={
            <DiaryButton
              text={'수정하기'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />

        <article>
          <section>
            <h4>오늘을 한 문장으로 나타낸다면?</h4>
            <div className="diary_oneLine_wrapper">
              <p>{data.oneLine}</p>
            </div>
          </section>

          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                'diary_img_wrapper',
                `diary_img_wrapper_${data.emotion}`,
              ].join(' ')}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>

          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
