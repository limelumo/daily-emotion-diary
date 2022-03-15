const DiaryButton = ({ text, type, onClick }) => {
  // 지정된 type의 button이 아닐 경우 default 설정
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button
      className={['DiaryButton', `DiaryButton_${btnType}`].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

DiaryButton.defaultProps = {
  type: 'default',
};

export default DiaryButton;
