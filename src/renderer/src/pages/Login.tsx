import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 로그인 성공/실패 콜백
  useEffect(() => {
    const handler = (res: { success: boolean; message?: string }) => {
      if (res.success) {
        navigate('/chat');
      } else {
        setError(res.message ?? '로그인에 실패했습니다.');
      }
    };

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
  );
}
