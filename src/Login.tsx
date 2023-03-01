import { Button, Form, Input, Page, Paragraph } from "@papa-ogen/craven-ui";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = () => {
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
          />
          <Input
            id="password"
            label="Ditt lösenord"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            type="password"
            placeholder="Password"
          />
          <Button onClick={onSubmit}>Logga in</Button>
        </Form>
      </div>
    </Page>
  );
};

const Login = () => {
  const loggedIn = false;

  if (!loggedIn) return <LoginForm />;

  return (
    <Page title="Inloggad!">
      <Paragraph>Du är nu inloggad. Vänligen kolla din enhet</Paragraph>
      <Paragraph variant="small">(Du kan stänga detta fönster)</Paragraph>
    </Page>
  );
};

export default Login;
