import { useEffect, useState } from "react";
import SplashScreen from "./Pages/SplashScreen";
import RoutesConfig from "./routes/RoutesConfig";

function App() {

  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  })

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <RoutesConfig/>
      )}
    </>
  );
}

export default App;
