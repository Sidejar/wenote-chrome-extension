import { Theme } from '@radix-ui/themes'
import React from 'react'
import logo from 'data-base64:~assets/images/wenote-logo.svg'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { LinkDetails } from './LinkDetails'

export const Popup: React.FC = () => {
  return (
    <Theme>
      <div className="popup">
        <img src={logo} />
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<LinkDetails />} />
          </Routes>
        </MemoryRouter>
      </div>
    </Theme>
  )
}
