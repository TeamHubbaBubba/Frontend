# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


I main.css importeras endast globala css-filer. Specifika filer importeras i respektive jsx-fil. Main.css importeras i main.jsx.

I public/images läggs bilder in som t.ex. bakgrunder eller andra statiska filer som pdf:er. Filer som inte ändras, de används av hela sidan.

I assets/images läggs bilder in som används direkt i koden och importeras. Används i specifika/flera komponenter.

Base.css används för all gemensam css för hela sidan.
Fonts.css används för gemensamma fonts.
Theme.css används för olika teman och färgvariabler på sidan.

Components är självständiga byggstenar som kan återanvändas på olika sidor. T.ex. buttons, cards, header, footer, nav.

Alla olika typer av formulär och kort etc läggs i separata jsx-filer men med gemensam css-fil.

I App.jsx sköts routingen mellan sidorna genom att innehållet i den specifika layouten läggs "inuti" dess route-tag. 
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="sessions" element={<SessionsPage />} />
        {/* Här lägger du in sidan som ska visas inuti MainLayout.
        Path är det som du skriver i urlen, typ localhost/sessions i detta fallet. */}
      </Route>
    </Routes>
I layout-filen sköts sedan renderingen av det som visas i vyn med taggen <Outlet />