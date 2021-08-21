import { useContext} from "react";
import { signInWithGoogle } from "./firebase";
import { Redirect } from "react-router-dom";
import "./Login.css"


import { AuthContext } from "./AuthProvider";

function Login() {
  let value = useContext(AuthContext);

  return (
    <div>
      {value ? <Redirect to="/home" /> : ""}

      <div id="sign_in">
        <div className="btn btn-primary m-4" onClick={signInWithGoogle}>
          <h4>Hello, Welcome to Reels</h4>
          <img src="https://assets.materialup.com/uploads/82eae29e-33b7-4ff7-be10-df432402b2b6/preview" />
          Sign In with Google
        </div>
      </div>
    </div>
  );
}

export default Login;
