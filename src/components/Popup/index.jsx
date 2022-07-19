import React from 'react';
import axios from '../../axiosAuth';
import ReactCodeInput from 'react-code-input';
function Popup({ classname, handleMenu }) {
  const [isValidated, setIsValidated] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [code, setCode] = React.useState('');
  const [timerActive, setTimerActive] = React.useState(false);
  const [isLetterSended, setIsLetterSended] = React.useState(false);
  const getCode = async () => {
    setIsLetterSended(true);
    await axios.get('/api/sent_code').then((res) => console.log(res));
  };
  const confirmValidation = async () => {
    const response = await axios.post('/api/check_code', {
      email_code: code,
    });
    if (response?.status === 200) {
      console.log('success');
      setIsValidated(true);
      return;
    }
    if (response.response.status) {
      alert('Код введен неверно!');
    }
  };
  const enableTimer = () => {
    getCode();
    setTimerActive(true);
    setSeconds(60);
  };
  React.useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  return (
    <div
      className={`whitespace-pre-wrap shadow-header max-w-xs w-[300px] bg-white absolute p-10 op-40 rounded-lg border-4 ${classname}`}>
      <button
        className='flex justify-center text-l h-6 w-6 absolute top-0 right-0 align-middle item-center border-2 border-black rounded-full'
        onClick={() => handleMenu(isValidated)}>
        X
      </button>

      {isLetterSended && !isValidated ? (
        <div className='flex flex-col items-center'>
          <ReactCodeInput
            fields={4}
            value={code}
            onChange={(code) => setCode(code)}></ReactCodeInput>
          <button
            className='border-2 mt-4 w-32'
            onClick={() => confirmValidation()}>
            Отправить
          </button>
          {seconds ? (
            <div className='text-xs mt-4'>
              Повторить отправку можно через {seconds}
            </div>
          ) : (
            <div>
              <b className='text-xs'>
                Не пришел код?{' '}
                <span
                  className='text-reg-color cursor-pointer'
                  onClick={() => enableTimer()}>
                  Отправить еще раз
                </span>
              </b>
            </div>
          )}
        </div>
      ) : isValidated ? null : (
        <div className='flex flex-col'>
          <p className=''>
            Нажмите кнопку ниже для получения письма с кодом на электронную
            почту
          </p>
          <button className='border-2 bg-white' onClick={() => getCode()}>
            Отправить письмо на почту
          </button>
        </div>
      )}
      {isValidated ? (
        <div>
          <h2>Почта успешна подтверждена!</h2>
        </div>
      ) : null}
    </div>
  );
}

export default Popup;
