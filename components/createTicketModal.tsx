import { Heading, Text } from "@radix-ui/themes"
import React, { useState } from "react"

import ConnectTool from "./connectTool"
import CreateTicket from "./createTicket"
import PmTool from "./pmTool"

const CreateTicketModal = ({ isOpen, setModalOpen }) => {
  const [viewState, setviewState] = useState("select-tool")
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-container bg-white p-4 w-[450px] h-auto p-6 bg-white rounded-xl shadow border border-slate-900 border-opacity-5">
        <div className="modal-content py-4">
          {viewState === "select-tool" && (
            <ConnectTool cta={() => setviewState("connect")} />
          )}
          {viewState === "connect" && (
            <PmTool cta={() => setviewState("jira")} />
          )}

          {viewState === "jira" && (
            <>
              <div className="flex justify-between items-center">
                <Heading size="5" className="!text-neutral-800 ">
                  Create ticket
                </Heading>
                <button
                  className="modal-close"
                  onClick={() => setModalOpen(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-header flex justify-between items-center">
                <Text as="p" size="2" className="!text-neutral-800 !mt-3 !mb-4">
                  Convert this comment to a ticket in your connected PM tool.
                </Text>
              </div>
              <CreateTicket setModalOpen={setModalOpen} cta={() => {}} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateTicketModal
