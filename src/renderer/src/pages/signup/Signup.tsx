import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { Link } from 'react-router-dom';
import 'notyf/notyf.min.css';
import styles from './Signup.module.css';


export default function Signup(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const nav = useNavigate();
  const notyf = new Notyf({ duration: 2500, ripple: false });

  // 폼 제출
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pw !== confirmPw) {
      notyf.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password: pw })
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || '회원가입 실패');
      }

      notyf.success('회원가입 완료! 로그인 해 주세요.');
      // 회원가입 성공 후 로그인 페이지로 이동
      nav('/');
    } catch (err: any) {
      console.error(err);
      notyf.error(err.message || '알 수 없는 오류');
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <div className={styles.logo}>회원가입</div>

        <form id="signup-form" onSubmit={onSubmit} className={styles.form}>
          <input
            id="email"
            type="text"
            placeholder="이메일"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className={styles.input}
          />

          <input
            id="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />

          <input
            id="password"
            type="password"
            placeholder="비밀번호(8자리 이상)"
            minLength={8}
            required
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className={styles.input}
          />

          <input
            id="confirm-password"
            type="password"
            placeholder="비밀번호 재확인"
            minLength={8}
            required
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.submitButton}>
            가입
          </button>
        </form>

        <div className={styles.altLink}>
          이미 계정이 있으신가요?{' '}
          <Link to="/" className={styles.linkButton}>
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
