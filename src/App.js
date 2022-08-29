import Forminfor from "./components/forminfor";
import { Routes, Route, useLocation } from "react-router-dom";
import Bookdetail from "./components/Bookdetail";
function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Forminfor />}>
          <Route path="forminfor/:bookId" element={<Bookdetail />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="forminfor/:bookId" element={<Bookdetail />} />
        </Routes>
      )}
    </>
  );
}
export default App;
