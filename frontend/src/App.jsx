import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Footer from "./components/Footer.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Blog from "./Pages/Blog.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import { useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";
import Creators from "./Pages/Creators.jsx";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./Dashboard/UpdateBlog.jsx";
import Detail from "./Pages/Detail.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Loader from "./components/Loader.jsx";
import { useLoader } from "./context/LoaderContext.jsx";

function App() {
  const location = useLocation();
  const hideNavebarFooter = ["/dashboard", "/log-in", "/register"].includes(
    location.pathname,
  );
  const { loading, blogs, isAuthenticated } = useAuth();
  console.log(isAuthenticated);
   if (loading) {
    return <Loader />;   // wait until auth check done
  }

  return (
    <div>
      {!hideNavebarFooter && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/log-in" />}
        />

        <Route exact path="/blogs" element={<Blog />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/log-in" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/blog/:id" element={<Detail />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      {!hideNavebarFooter && <Footer />}
    </div>
  );
}

export default App;
