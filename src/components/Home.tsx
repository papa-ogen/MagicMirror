import { Button, Page, Paragraph } from "@papa-ogen/craven-ui";
import { signOut } from "../firebase";
import Todos from "./Todos";

const Home = () => {
  return (
    <Page title="Magic Mirror">
      <Button variant="error" onClick={() => signOut()}>
        Log Out
      </Button>
      <Todos />
    </Page>
  );
};

export default Home;
