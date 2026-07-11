import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import Contact from "./Contact";

jest.mock("@emailjs/browser", () => ({
  __esModule: true,
  default: {
    send: jest.fn(),
  },
}));

beforeEach(() => {
  process.env.REACT_APP_EMAILJS_SERVICE_ID = "service_test";
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID = "template_test";
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY = "public_test";
  jest.clearAllMocks();
  emailjs.send.mockResolvedValue({ status: 200, text: "OK" });

  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = MockIntersectionObserver;
});

test("submits the contact form and shows a success message", async () => {
  render(<Contact />);

  await userEvent.type(screen.getByLabelText(/full name/i), "Noor Alhaj");
  await userEvent.type(screen.getByLabelText(/phone/i), "0799999999");
  await userEvent.type(screen.getByLabelText(/email/i), "noor@example.com");
  await userEvent.type(screen.getByLabelText(/message/i), "Hello from the test suite");
  await userEvent.click(screen.getByRole("button", { name: /send message/i }));

  await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));
  expect(await screen.findByText(/your message was sent successfully/i)).toBeTruthy();
});
