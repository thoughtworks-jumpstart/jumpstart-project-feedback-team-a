import Feedback from "./Feedback";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapMessageContextToProps,
  mapSessionContextToProps
} from "../context_helper";
import { withRouter } from "react-router";

const mapContextToProps = context => {
  return {
    ...mapMessageContextToProps(context),
    ...mapSessionContextToProps(context)
  };
};

export default withRouter(
  subscribe(ProviderContext, mapContextToProps)(Feedback)
);
