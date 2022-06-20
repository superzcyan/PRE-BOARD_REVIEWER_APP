import React from "react";

const Card = ({ title, body, shortest, longest }) => {
  return (
    <div className="flex flex-col justify-center items-center block p-8 max-w-sm">
      <h5 className="text-gray-700 text-md leading-tight font-medium mb-2">
        {title}
      </h5>
      {body.avgMinsHardTime ? (
        <div className="text-gray-900 text-5xl font-medium mb-4">
          {body.avgMinsHardTime > 0 ? body.avgMinsHardTime : 0}
          <span className="text-sm">mins</span>
          {body.avgSecsHardTime > 0 ? body.avgSecsHardTime : 0}
          <span className="text-sm">secs</span>
        </div>
      ) : (
        <div className="text-gray-900 text-5xl font-medium mb-4">
          {body > 0 ? body.toFixed(1) : 0}
          <span className="text-sm">secs</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2 text-gray-900 text-sm font-light divide-x">
        <div className="flex flex-col justify-center items-center">
          <div className="font-medium">
            {shortest ? shortest.toFixed(1) : 0}
          </div>
          <div className="">shortest</div>
        </div>
        <div className="flex  flex-col justify-center items-center">
          <div className="font-medium">{longest ? longest.toFixed(1) : 0}</div>
          <div className="pl-4">longest</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
