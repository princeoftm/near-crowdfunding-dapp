import React from "react";
import Card from "./Card";

const CardList = ({ allCampaigns, fundCampaign }) => {

  return (
    <div className="py-8"> {/* Add some vertical padding */}
      {allCampaigns && allCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {/* Responsive grid:
              - 1 column on small screens (default)
              - 2 columns on sm+ screens
              - 3 columns on lg+ screens
              - 4 columns on xl+ screens
              - gap-6 provides spacing between cards
              - px-4 adds some horizontal padding on the list itself */}
          {allCampaigns.map((data) => (
            <Card
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
              image={data.image}
              targetAmount={data.target} // Assuming 'target' is the correct prop name from your data
              amount_collected={data.amount_collected}
              deadline={data.deadline}
              status={data.status}
              fundCampaign={fundCampaign}
            />
          ))}
        </div>
      ) : (
        // Enhanced Empty State Message
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-800 rounded-lg p-8 mx-4">
            <p className="text-gray-400 text-2xl font-semibold mb-4">No Funding Campaigns Found</p>
            <p className="text-gray-500 text-lg text-center">
                It looks like there are no campaigns matching your criteria.
                <br/> Try adjusting your filter or check back later!
            </p>
            {/* Optionally, you can add an image or icon here */}
            {/* <img src="/path/to/empty-state-icon.svg" alt="No campaigns" className="w-24 h-24 mt-6 opacity-50" /> */}
        </div>
      )}
    </div>
  );
};

export default CardList;