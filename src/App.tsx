import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchRepo from "./pages/SearchRepo";
import SearchUser from "./pages/SearchUser";

const App = (): JSX.Element => {
  // return routers which represents a component for each route
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchRepo />} />
        <Route path="/search-users" element={<SearchUser />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
