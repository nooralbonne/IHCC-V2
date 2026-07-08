import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

describe("ProjectDetails", () => {
  it("renders the project matching the slug from the route", () => {
    render(
      <MemoryRouter initialEntries={["/projects/faculty-of-dentistry-hashemite-university"]}>
        <Routes>
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1, name: /Faculty of Dentistry Building/i })).toBeInTheDocument();
  });
});
