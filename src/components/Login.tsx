import { Button, Form, Input, Page, Paragraph } from "@papa-ogen/craven-ui";
import React, { useContext, useState } from "react";
import { signIn } from "../firebase";
import { AuthContext } from "./AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
    signIn(email, password)
      .then(() => {
        setIsLoading(false);
        console.log("logged in");
      })
      .catch(() => console.log("ERROR"));
    console.log("Loggin in");
  };
  return (
    <Page title="Logga in">
      <div style={{ maxWidth: 400 }}>
        <Form>
          <Input
            id="email"
            label="Skriv email här"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            type="text"
            placeholder="Email Address"
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Ditt lösenord"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            type="password"
            placeholder="Password"
            disabled={isLoading}
          />
          <Button onClick={onSubmit} disabled={isLoading}>
            Logga in
          </Button>
        </Form>
      </div>
    </Page>
  );
};

const Login = () => {
  const user = useContext(AuthContext);

  if (!user) return <LoginForm />;

  return (
    <Page title="Inloggad!">
      <Paragraph>Du är nu inloggad. Vänligen kolla din enhet</Paragraph>
      <Paragraph variant="small">(Du kan stänga detta fönster)</Paragraph>
    </Page>
  );
};

export default Login;
