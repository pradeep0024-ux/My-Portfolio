// Contact.jsx
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { Snackbar, Alert } from "@mui/material";

/* ========== keep your styled components (I added a disabled style to the button) ========== */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* ================== Component ================== */
const Contact = () => {
  const form = useRef(null);
  const [open, setOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success"); // 'success' | 'error' | 'info' | 'warning'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // optional: initialize with public key once
    const pub = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    if (pub) emailjs.init(pub);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.current) return;

    const fd = new FormData(form.current);
    const from_email = fd.get("from_email")?.toString().trim();
    const from_name = fd.get("from_name")?.toString().trim();
    const message = fd.get("message")?.toString().trim();

    // basic client-side validation
    if (!from_email || !from_name || !message) {
      setSnackMsg("Please fill required fields (name, email, message).");
      setSnackSeverity("error");
      setOpen(true);
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      setSnackMsg("Message sent — thank you! I will reply soon.");
      setSnackSeverity("success");
      setOpen(true);
      form.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSnackMsg(
        "Failed to send. Please try again later or email me directly."
      );
      setSnackSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Let's Connect</Title>
        <Desc>
          Have a question, opportunity, or just want to say hi? I’d love to hear
          from you!
        </Desc>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Send Me a Message 📩</ContactTitle>

          <ContactInput
            placeholder="Your Email Address"
            name="from_email"
            type="email"
            required
            aria-label="Your email"
          />
          <ContactInput
            placeholder="Your Full Name"
            name="from_name"
            required
            aria-label="Your name"
          />
          <ContactInput
            placeholder="Subject / Topic"
            name="subject"
            aria-label="Subject"
          />
          <ContactInputMessage
            placeholder="Write your message here..."
            rows="4"
            name="message"
            required
            aria-label="Message"
          />
          <ContactButton
            type="submit"
            value={loading ? "Sending..." : "Send Message 🚀"}
            disabled={loading}
          />
        </ContactForm>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={snackSeverity}
            sx={{ width: "100%" }}
          >
            {snackMsg}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
