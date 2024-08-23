import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { ListsProvider } from './list-context'
import { ItemsProvider } from './item-context'

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ListsProvider>
      <ItemsProvider>
        {children}
      </ItemsProvider>
    </ListsProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender as render}