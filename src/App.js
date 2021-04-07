import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Giveaways from "./components/Giveaways/Giveaways";
import Giveaway from "./components/GiveawayPage/Giveaway";
import Auth from "./components/Auth/Auth";
import Create from "./components/Create/Create";
import Edit from "./components/EditGiveaway/Edit";
import Footer from "./components/Footer/Footer";
import Policy from "./components/Privacy Policy/Policy";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props}></Home>} />
        <Route exact path="/giveaways">
          <Giveaways />
        </Route>
        <Route exact path="/giveaway/:id">
          <Giveaway />
        </Route>
        <Route exact path="/edit">
          <Edit />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/policy">
          <Policy />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
