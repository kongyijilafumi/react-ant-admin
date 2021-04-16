import React from "react";
import { Link } from "react-router-dom";
export default function Power() {
  return (
    <div className="power-container">
      <h2> 这是部分权限可以查看的页面：当前权限为最小</h2>
      <Link to="/power/0">当权限不够时，无法去往此页面！</Link>
    </div>
  );
}
