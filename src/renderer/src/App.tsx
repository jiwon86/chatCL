
import { useEffect, useRef } from 'react';
import styles from './App.module.css';
import ChatList from './components/ChatList';

function App(): React.JSX.Element {
  const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

      //사이즈 체크
      const box = boxRef.current;
      const { width, height } = box!.getBoundingClientRect();
      
      // 사이즈 조절
      window.utilAPI.setSize(Math.ceil(width), Math.ceil(height));   // ipcRenderer.invoke('set-size', w, h);
       
      return () => {

      };
    }, []);

  return (
    <div ref={boxRef} className='contentWrapper'>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.icon}>💬</div>
          <div className={styles.icon}>👥</div>
          <div className={styles.icon}>⚙️</div>
        </aside>
        <main className={styles.main}>
          <ChatList />
        </main>
      </div>
    </div>
  );
}

export default App
