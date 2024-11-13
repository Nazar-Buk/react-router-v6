import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";
import ErrorPage from "./error-page";
import Contact, { loader as contactLoader } from "./routes/contact";
import EditContact, { action as editAction } from "./routes/edit";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      //children --> всі сторінки що в цьому масиві будуть відображатися на сторінці <Root/>,
      // типу буде менюха з ліва, а весь контент інших сторінок буде відображатися праворуч
      // Звичайно я можу зробити таких декілька і вкладати в них інші сторінки
      {
        path: "contacts/:contactId",
        element: <Contact />,
        //  /:contactId --> дає можливість /:contactId  давати багато сторінок з товарами чи користувачами
        // Зверніть увагу на сегмент URL-адреси :contactId. Двокрапка (:) має особливе значення, перетворюючи його
        //на «динамічний сегмент». Динамічні сегменти відповідатимуть динамічним (змінним) значенням у цій позиції URL-адреси,
        //як-от ідентифікатор контакту. Ці значення в URL-адресі ми називаємо "параметрами URL-адреси"
        //або скорочено просто "параметрами".
        // УВАГА! Ці значення можна отримати таким чином params.contactId, ця вся фігня після двокрапки попадає в params
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
