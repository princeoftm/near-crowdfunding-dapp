import React, { useState } from "react";
import CardList from "./CardList";

const CompletedCampaigns = ({ campaigns, isConnected, isLoading, fundCampaign}) => {
  const [filter, setFilter] = useState("all");

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filter === "open") return campaign.status == "closed";
    if (filter === "closed") return campaign.status !== "closed";
    return true;
  });

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="absolute top-4 right-4 mt-[50px] p-10">
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
        >
          <option value="all">All Campaigns</option>
          <option value="open">Open Campaigns</option>
          <option value="closed">Closed Campaigns</option>
        </select>
      </div>
      {isConnected ? (
        isLoading ? (
          <p className="text-white text-xl">Loading...</p>
        ) : (
          <CardList allCampaigns={filteredCampaigns} fundCampaign={fundCampaign}/>
        )
      ) : (
        <div className="text-center">
          <p className="text-white text-lg">Connect your wallet</p>
        </div>
      )}
    </div>
  );
};

export default CompletedCampaigns;

