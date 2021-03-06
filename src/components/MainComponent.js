import React, { Component } from "react";
import Incidents from "./IncidentsComponent";
import IncidentDetail from "./IncidentDetailComponent";
import Footer from "./FooterComponent";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { fetchData, postQuery } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    incidents: state.incidents,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(fetchData());
  },
  postQuery: (query) => {
    dispatch(postQuery(query));
  },
  resetQueryForm: () => {
    dispatch(actions.reset("query"));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Switch>
            <Route
              exact
              path="/cases"
              component={() => (
                <Incidents
                  incidents={this.props.incidents}
                  postQuery={this.props.postQuery}
                  resetQueryForm={this.props.resetQueryForm}
                />
              )}
            />
            <Route
              path="/cases/:incidentId"
              render={(props) => {
                return (
                  <IncidentDetail
                    id={props.match.params.incidentId}
                    incidents={this.props.incidents.incidents.incidents}
                    isLoading={this.props.incidents.isLoading}
                    errMess={this.props.incidents.errMess}
                  />
                );
              }}
            />

            <Redirect to="/cases" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
