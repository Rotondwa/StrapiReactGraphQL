import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

// Page & Layout imports
import Homepage from "./pages/Homepage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import SiteHeader from "./components/SiteHeader";

// Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql', // Strapi GraphQL endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/api/details/:id" element={<ReviewDetails />} />
            <Route path="/api/category/:id" element={<Category />} />
            <Route path="*" element={<p>Page not found!</p>} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
