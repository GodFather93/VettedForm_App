import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/index";
import _ from "lodash";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";

class WelcomeIndex extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="text-xs-left">
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 } : {})}
          >
            <div>
              <h3 className="welcome">
                Welcome to Vetted Application Manager{" "}
              </h3>
            </div>
          </Grow>
          <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Link className="btn btn-primary" to="/new">
              Fill Application Form ?
            </Link>
          </Slide>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(WelcomeIndex);
