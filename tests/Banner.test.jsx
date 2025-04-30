import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppContext } from "../src/context/AppContext";
import Banner from "../src/component/Banner";

//1- user type in name submit it and the name is displayed in the banner and log in buttons appears.
//2- user chooses the login button and the login function is called
describe("Banner", () => {
  const renderWithContext = (overrides = {}) => {
    const mockHandlerNameInput = jest.fn();
    const mockSubmitHandler = jest.fn();

    const defaultContext = {
      setContinueToSearchAsGuest: jest.fn(),
      handleLoginToSpotify: jest.fn(),
      handlerNameInput: mockHandlerNameInput,
      submitHandler: mockSubmitHandler,
      continueToSearchAfterLogin: false,
      continueToSearchAsGuest: false,
      submitted: false,
      name: "",
      ...overrides,
    };

    render(
      <AppContext.Provider value={defaultContext}>
        <Banner />
      </AppContext.Provider>
    );

    return { mockHandlerNameInput, mockSubmitHandler };
  };
  it("should display wecome message and input field", () => {
    renderWithContext({
      submitted: false,
      name: "",
    });
    const inputName = screen.getByPlaceholderText("please Enter your name");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const welcomeMessage = screen.getByText(/welcome to jammming/i);

    expect(welcomeMessage).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit");
  });

  it("should handlers to be called by putting the name and clickinh on submit button", () => {
    const { mockHandlerNameInput, mockSubmitHandler } = renderWithContext({});

    const inputName = screen.getByPlaceholderText("please Enter your name");
    fireEvent.change(inputName, { target: { value: "John" } });
    expect(mockHandlerNameInput).toHaveBeenCalledTimes(1);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
  });

  it("should display name in wellcome message when name is provided and login buttons for guset and login to spotify appears", () => {
    renderWithContext({
      submitted: true,
      name: "John",
    });
    const welcomeMessage = screen.getByText(/welcome to jammming John!/i);
    const logInToSpotifyButton = screen.getByRole("button", {
      name: /log in to spotify/i,
    });
    const continueAsGuestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    expect(welcomeMessage).toBeInTheDocument();
    expect(logInToSpotifyButton).toBeInTheDocument();
    expect(continueAsGuestButton).toBeInTheDocument();
  });

  it("should call handleLoginToSpotify when login button is clicked", () => {
    const mockHandleLoginToSpotify = jest.fn();
    renderWithContext({
      submitted: true,
      name: "John",
      handleLoginToSpotify: mockHandleLoginToSpotify,
    });
    const logInToSpotifyButton = screen.getByRole("button", {
      name: /log in to spotify/i,
    });
    fireEvent.click(logInToSpotifyButton);
    expect(mockHandleLoginToSpotify).toHaveBeenCalledTimes(1);
  });

  it("should call handleContinueAsGuest when continue as guest button is clicked", () => {
    const mockSetContinueToSearchAsGuest = jest.fn();
    renderWithContext({
      submitted: true,
      name: "John",
      setContinueToSearchAsGuest: mockSetContinueToSearchAsGuest,
    });
    const continueAsGuestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    fireEvent.click(continueAsGuestButton);
    expect(mockSetContinueToSearchAsGuest).toHaveBeenCalledWith(true);
    expect(mockSetContinueToSearchAsGuest).toHaveBeenCalledTimes(1);
  });
});
