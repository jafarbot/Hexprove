import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactConfirmationProps {
  name: string;
  message: string;
}

export function ContactConfirmation({ name, message }: ContactConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out to Hexprove</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Hi {name},
          </Heading>

          <Text style={paragraph}>
            Thanks for reaching out. We&apos;ve received your message and will
            get back to you within 24 hours.
          </Text>

          <Hr style={hr} />

          <Text style={subheading}>
            Here&apos;s what you sent us:
          </Text>

          <Section style={messageCard}>
            <Text style={messageText}>
              {message}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={paragraph}>
            While you wait, you might find this helpful:
          </Text>

          <Text style={linkText}>
            <Link
              href="https://hexprove.com/blog/truebit-26m-logic-bug"
              style={link}
            >
              How a $26M Bug Slipped Through
            </Link>
          </Text>

          <Text style={paragraph}>
            Talk soon,
          </Text>
          <Text style={signature}>
            The Hexprove Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactConfirmation;

const main = {
  backgroundColor: "#0A0A0A",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#0A0A0A",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const heading = {
  color: "#FFFFFF",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 24px",
};

const paragraph = {
  color: "#9CA3AF",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px",
};

const subheading = {
  color: "#9CA3AF",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "1.5",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
};

const messageCard = {
  backgroundColor: "#1A1A1A",
  borderRadius: "8px",
  padding: "16px 20px",
  margin: "0 0 24px",
  border: "1px solid #2A2A2A",
};

const messageText = {
  color: "#D1D5DB",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
  fontStyle: "italic",
};

const hr = {
  borderColor: "#2A2A2A",
  margin: "24px 0",
};

const linkText = {
  margin: "0 0 24px",
};

const link = {
  color: "#00F5A0",
  fontSize: "16px",
  textDecoration: "none",
};

const signature = {
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "1.6",
  margin: "0",
};
