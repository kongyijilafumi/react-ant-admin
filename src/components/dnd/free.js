import React from "react";
import { DraggableArea } from "react-draggable-tags";

export default function FreeDnd({ data, onChange, renderItem }) {
  return (
    <div className="free-dnd-wrapper">
      <DraggableArea tags={data} render={renderItem} onChange={onChange} />
    </div>
  );
}
