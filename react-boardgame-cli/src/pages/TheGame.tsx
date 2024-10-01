import Game from '../components/thegame/Game.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Othello = () => {
  return (
    <>
      <h2>ザ・ゲーム</h2>
      <Game />
      <ToastContainer
        position="top-right"
        autoClose={1500} // 1.5秒後に自動で消える
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Othello