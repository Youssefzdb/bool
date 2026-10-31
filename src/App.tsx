import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Gallery from "./pages/Gallery";
import Docs from "./pages/Docs";
import WhatsNew from "./pages/WhatsNew";
import DropPage from "./pages/DropPage";
import UseCasesPage from "./pages/UseCasesPage";

import AppLayout from "./app/AppLayout";
import Dash from "./app/Dash";
import Projects from "./app/Projects";
import Chats from "./app/Chats";
import DropApp from "./app/DropApp";
import Domains from "./app/Domains";
import Agents from "./app/Agents";
import Usage from "./app/Usage";
import WsSettings from "./app/WsSettings";
import Editor from "./app/Editor";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/drop" element={<DropPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="*" element={<Home />} />
      </Route>
      <Route path="/docs" element={<Docs />} />

      {/* authenticated app (bool.com dashboard clone) */}
      <Route path="/app/*" element={<AppLayout />}>
        <Route index element={<Dash />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:tab" element={<Projects />} />
        <Route path="templates" element={<Projects />} />
        <Route path="chats" element={<Chats />} />
        <Route path="drop" element={<DropApp />} />
        <Route path="domains" element={<Domains />} />
        <Route path="agents" element={<Agents />} />
        <Route path="settings/usage" element={<Usage />} />
        <Route path="workspaces/settings/:tab" element={<WsSettings />} />
        <Route path="editor/:name" element={<Editor />} />
        <Route path="*" element={<Dash />} />
      </Route>
    </Routes>
  );
}
