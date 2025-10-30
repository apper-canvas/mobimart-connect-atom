import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from "react-toastify";
import { userSlice } from "@/store/userSlice";
import { router } from "@/router";

// Configure Redux store
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}
export default App;