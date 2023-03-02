import { Page, Paragraph } from "@papa-ogen/craven-ui";
import QRCode from "react-qr-code";
import randomToken from "random-token";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  const token: string = randomToken(64);

  return (
    <Page title="Magic Mirror">
      <Paragraph>Du är inte inloggad.</Paragraph>
      <Paragraph>
        Scanna QR-koden för att logga in via telefonen.
        <br /> Eller gå till{" "}
        <Link to="/login" className="text-sky-9">
          login-sidan
        </Link>
      </Paragraph>
      <Paragraph>
        <Link to={`/login?token=${token}`} className="text-sky-9">
          login-sidan med params
        </Link>
      </Paragraph>
      <div style={{ background: "white", padding: "16px" }}>
        <div
          style={{
            height: "auto",
            margin: "0 auto",
            maxWidth: 128,
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`/login?token=${token}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </Page>
  );
};

export default NotLoggedIn;
