import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import { auth } from "firebaseui";

// FirebaseUI still requires a compat style Firebase app to work, this is the case for using phone number auth.
// This is a workaround until FirebaseUI is updated to support modular style Firebase apps.
// You can find more information about this issue here: https://github.com/firebase/firebaseui-web/issues/961
import "firebase/compat/auth";
import compatApp from "firebase/compat/app";
import { firebaseConfig } from "@/app/components/helpers/config";

compatApp.initializeApp(firebaseConfig);
export const authForFirebaseUI = compatApp.auth();

interface Props {
  uiConfig: auth.Config;
  uiCallback?(ui: auth.AuthUI): void;
  className?: string;
}

const StyledFirebaseAuth = ({ uiConfig, className, uiCallback }: Props) => {
  const [firebaseui, setFirebaseui] = useState<
    typeof import("firebaseui") | null
  >(null);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // firebase UI only works on the client. So we're loading the package only after
    // the component has mounted, so that this works when doing server-side rendering
    setFirebaseui(require("firebaseui"));
  }, []);

  useEffect(() => {
    if (firebaseui === null) return;

    // get or create a firebaseUI instance
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(authForFirebaseUI);

    if (uiConfig.signInFlow === "popup") firebaseUiWidget.reset();

    // track auth state to reset firebaseUi if the user signs out
    const unregisterAuthObserver = onAuthStateChanged(
      authForFirebaseUI,
      (user) => {
        if (!user && userSignedIn) firebaseUiWidget.reset();
        setUserSignedIn(!!user);
      },
    );

    if (uiCallback) uiCallback(firebaseUiWidget);

    firebaseUiWidget.start(elementRef.current || "", uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [firebaseui, uiCallback, uiConfig, userSignedIn]);

  return <div className={className} ref={elementRef} />;
};

export default StyledFirebaseAuth;
