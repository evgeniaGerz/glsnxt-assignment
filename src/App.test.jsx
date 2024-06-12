import { beforeEach, describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "./App"
import userEvent from "@testing-library/user-event"
import { TEXTS } from "./text.constants"
import { act } from "react"

describe("App", () => {
  beforeEach(() => {
    render(<App />)
  })

  it("renders the button", () => {
    expect(
      screen.getByRole("button", { name: "open modal" })
    ).toBeInTheDocument()
  })

  it("opens the modal on button click", async () => {
    await userEvent.click(screen.getByRole("button", { name: "open modal" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText(TEXTS.newModal.title)).toBeInTheDocument()
    expect(screen.getByText(TEXTS.newModal.body)).toBeInTheDocument()
    expect(screen.getAllByRole("button", { name: "Close" }).length).toBe(2)
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("closes the modal on close button click", async () => {
    await userEvent.click(screen.getByRole("button", { name: "open modal" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await userEvent.click(screen.getAllByRole("button", { name: "Close" })[0])

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("closes the modal on backdrop click", async () => {
    await userEvent.click(screen.getByRole("button", { name: "open modal" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await userEvent.click(screen.getByLabelText("backdrop"))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("saves and close the modal on save button click", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })

    await userEvent.click(screen.getByRole("button", { name: "open modal" }))

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    await userEvent.click(screen.getByRole("button", { name: "Save" }))
    expect(screen.getByText("Saving...")).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    vi.clearAllTimers()
  })
})
