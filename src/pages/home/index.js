import React from "react";
import { connect } from "react-redux";
import { increment } from "@/store/action";

const mapStateToProps = (state, ownProps) => {
  return {
    num: state.global.num,
  };
};

function Home(props) {
  return (
    <div>
      <h1>Home state:{props.num}</h1>
      <button onClick={() => props.dispatch(increment())}>increment</button>
    </div>
  );
}


export default connect(mapStateToProps, null)(Home);
