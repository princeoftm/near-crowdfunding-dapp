import React, { useState } from "react";
// import "../App.css"; // We'll try to rely more on Tailwind, might remove this or adjust its content

const Card = ({ id, title, image, description, deadline, targetAmount, amount_collected, status, fundCampaign }) => {
    const [fundAmount, setFundAmount] = useState("");
    const [isFunding, setIsFunding] = useState(false); // State for loading during funding
    const [fundError, setFundError] = useState(''); // State for funding errors

    const handleAmountChange = (e) => {
        setFundAmount(e.target.value);
        setFundError(''); // Clear error on change
    };

    const handleFundClick = async () => {
        if (!fundAmount || parseFloat(fundAmount) <= 0) {
            setFundError("Please enter a valid amount to fund.");
            return;
        }

        setIsFunding(true);
        setFundError('');

        try {
            // Assuming fundCampaign returns a Promise
            await fundCampaign(id, fundAmount);
            setFundAmount(""); // Clear input on success
            // Removed alert here, assuming Index.jsx's toast system handles notifications
        } catch (error) {
            console.error("Error funding campaign:", error);
            setFundError(`Failed to fund: ${error.message || "An unknown error occurred"}`);
        } finally {
            setIsFunding(false);
        }
    };

    const convertToIST = (timestamp) => {
        // Guard clause for invalid timestamp
        if (!timestamp || (typeof timestamp !== 'bigint' && typeof timestamp !== 'number')) {
            return 'Invalid Date';
        }

        // Convert BigInt to Number if necessary, then to seconds
        const timestampInSeconds = Number(BigInt(timestamp) / BigInt(1_000_000_000));
        const date = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const options = {
            weekday: 'short', // 'long' for full, 'short' for abbreviated
            year: 'numeric',
            month: 'short', // 'long' for full, 'short' for abbreviated
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'Asia/Kolkata', // Convert to IST (Kolkata)
            hour12: true // Use 12-hour format with AM/PM
        };
        try {
            return new Intl.DateTimeFormat('en-IN', options).format(date);
        } catch (e) {
            console.error("Date formatting error:", e);
            return "Error formatting date";
        }
    };

    // --- NEW LOGIC FOR STATUS HANDLING ---
    // Safely parse target and collected amounts as floats for comparison
    const targetFloat = parseFloat(targetAmount);
    const collectedFloat = parseFloat(amount_collected);

    // Determine if the campaign is active or closed
    // A campaign is NOT active if:
    // 1. Its status from the contract/processing is 'closed', 'Goal Met', or 'Expired'
    // 2. Its deadline has passed (checked below)
    // 3. Amount collected >= Target amount
    const isGoalMet = collectedFloat >= targetFloat && targetFloat > 0; // Check if goal is met, and target isn't zero
    const deadlinePassed = deadline && (Number(BigInt(deadline) / BigInt(1_000_000_000)) * 1000) < Date.now();
    
    // The fundable status for rendering the button
    const isFundable = status === "open" && !deadlinePassed && !isGoalMet;

    // The status to display on the card
    let displayStatusText = "Open";
    if (status === "Goal Met" || isGoalMet) { // Prioritize "Goal Met" if it's true
        displayStatusText = "Goal Met";
    } else if (deadlinePassed) {
        displayStatusText = "Expired";
    } else if (status === "closed" || status === "Expired") { // Fallback for explicit closed/expired status from data
        displayStatusText = "Closed";
    }


    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-sm mx-auto my-4 md:my-6">
            {/* Image Section */}
            <div className="h-48 w-full overflow-hidden bg-gray-700 flex items-center justify-center">
                {image ? (
                    <img className="object-cover w-full h-full" alt={title} src={image} />
                ) : (
                    <div className="text-gray-400 text-lg">No Image</div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col justify-between h-auto">
                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 text-sm">
                    <p className="text-gray-300 font-medium">Target:</p>
                    <p className="text-purple-300 font-bold">{targetAmount} ETH</p> {/* Changed to ETH as per original code */}

                    <p className="text-gray-300 font-medium">Collected:</p>
                    <p className="text-green-400 font-bold">{amount_collected} ETH</p> {/* Changed to ETH as per original code */}
                    
                    <p className="text-gray-300 font-medium">Deadline:</p>
                    <p className="text-blue-300">{convertToIST(deadline)}</p>

                    <p className="text-gray-300 font-medium">Status:</p>
                    <p className={`font-semibold ${
                        displayStatusText === "Open" ? 'text-emerald-400' : 
                        displayStatusText === "Goal Met" ? 'text-lime-400' : // New color for Goal Met
                        'text-red-400' // For Closed/Expired
                    }`}>
                        {displayStatusText}
                    </p>
                </div>

                {/* Funding Action / Status */}
                {!isFundable ? ( // Use the new isFundable boolean
                    <button
                        disabled
                        className="w-full bg-gray-700 text-gray-400 px-4 py-3 rounded-lg font-semibold cursor-not-allowed text-lg"
                    >
                        {displayStatusText === "Goal Met" ? "Goal Achieved!" : "Fundraiser Closed"}
                    </button>
                ) : (
                    <div className="mt-4">
                        <label htmlFor={`fundAmount-${id}`} className="block text-sm text-gray-300 mb-2">
                            Amount to Fund (ETH):
                        </label>
                        <input
                            id={`fundAmount-${id}`} // Unique ID for accessibility
                            type="number"
                            value={fundAmount}
                            onChange={handleAmountChange}
                            placeholder="e.g., 0.5"
                            step="0.01" // Allow decimal inputs for ETH
                            min="0"
                            className="w-full p-3 mb-3 rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {fundError && (
                            <p className="text-red-400 text-xs mb-3">{fundError}</p>
                        )}
                        <button
                            onClick={handleFundClick}
                            disabled={isFunding}
                            className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors duration-200
                                ${isFunding 
                                    ? 'bg-purple-700 opacity-70 cursor-not-allowed' 
                                    : 'bg-purple-600 hover:bg-purple-700'
                                }
                            `}
                        >
                            {isFunding ? 'Funding...' : 'Fund Now'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;