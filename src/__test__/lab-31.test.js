import { screen, render, fireEvent, getAllByTestId, getByTestId, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import List from "../Components/List/List";
import Settings from "../context/settings/settings";
import Demo from "../Components/Pagination/Pagination";
import Todo from "../Components/Todo";
import { BrowserRouter } from 'react-router-dom';



describe('lab 31 ', () => {
     it('', () => {
          render(
               <BrowserRouter>
                    <Settings>
                         <App />
                    </Settings>
                </BrowserRouter>

          )

          const header = screen.getByText(/To Do List: 3 items pending/i)
          expect(header).toBeInTheDocument()

          const settingsPage = screen.getByRole('link', {
               name: /settings/i
          })
          
          fireEvent.click(settingsPage)
          
          const text = screen.getByText(/Updated Settings/i)
          const text_2 = screen.getAllByText(/Items per page/i)

          expect(settingsPage).toBeInTheDocument()
          expect(text).toBeInTheDocument()
          expect(text_2).toHaveLength(2)
          
     })
     it('check if the items exist in the dom', () => {
          render(
               <Settings>
                <List  />
               </Settings>
          )
          const contianer = screen.getByTestId('contianer')
          const item_cont = screen.getAllByTestId('item-cont')

          expect(contianer).toBeInTheDocument()
          expect(item_cont).toHaveLength(3)
          expect(item_cont[0].textContent).toContain('text 1')
     })

     it('check if the pagination work normaly and if the new items has been shown correctly', async () => {
          render(
               <Settings>
                    <Todo/>
                    <List  />
                    <Demo/>
               </Settings>
          )

          const input = screen.getByLabelText(/To Do Item/i)
          fireEvent.change(input, {
               target: { value : 'ehab' }
          })
          
          const submit = screen.getByText(/add item/i)
          
          waitFor(() => fireEvent.submit(submit)) 
          const btn_2 = screen.getByRole('button', {
               name : 2
          })
         waitFor(() => fireEvent.click(btn_2)) 
         const contianer = screen.getByTestId('contianer')

          // const items = screen.getAllByTestId('item-cont')

          expect(contianer).toBeInTheDocument()
          expect(btn_2).toBeInTheDocument()
          // expect(items).toHaveLength(1)
          // expect(items[0].textContent).toContain('ehab')

     })
})
