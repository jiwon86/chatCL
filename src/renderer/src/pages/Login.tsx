import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const loginBoxRef = useRef<HTMLDivElement>(null);

  // 로그인 성공/실패 콜백
  useEffect(() => {
    const handler = (res: { success: boolean; message?: string }) => {
      if (res.success) {
        navigate('/chat');
      } else {
        setError(res.message ?? '로그인에 실패했습니다.');
      }
    };

    const box = loginBoxRef.current;
    const { width, height } = box!.getBoundingClientRect();
    
    const shadow = getComputedStyle(box!).boxShadow;
    const pxMatches = shadow.match(/-?\d+px/g) || [];
    const [ox = 0, oy = 0, blur = 0, spread = 0] = pxMatches.map(v => parseInt(v, 10));

    const extraX = Math.abs(ox) + blur + spread;   // 좌·우 여유
    const extraY = Math.abs(oy) + blur + spread;   // 위·아래 여유
    console.log(extraX,extraY);
    const w = Math.ceil(width)  + extraX * 2;
    const h = Math.ceil(height) + extraY * 2;

    window.utilAPI.setSize(Math.ceil(width), Math.ceil(height));   // ipcRenderer.invoke('set-size', w, h);
     

   // window.electronAPI.on('login-response', handler);

    return () => {
      // 컴포넌트 언마운트 시 리스너 해제
     // window.electronAPI.on('login-response', () => {});
    };
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    //window.electronAPI.send('login-attempt', { email, password });
  };

  return (
    <div ref={loginBoxRef} className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.logo}>WizChat</div>

          <form id="login-form" onSubmit={onSubmit} className={styles.form}>
            <input
              id="username"
              type="text"
              placeholder="이메일"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />

            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              required
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />

            <button type="submit" className={styles.submitButton}>
              로그인
            </button>
          </form>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.altLink}>
            계정이 없으신가요?{' '}
            <Link to="/signup" className={styles.linkButton}>
              회원가입 하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
