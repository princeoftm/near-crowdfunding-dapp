import { useContext, useEffect, useState } from "react"
import { Navbar } from "../components/Navbar";
import Home from "../components/Home";
import { PinataSDK } from "pinata-web3";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from "../components/Create";
import { NearContext } from '@/wallets/near';
import Explore from "../components/Explore";
import {CrowdfundingNearContract} from "../config.js";
import { Buffer } from 'buffer'

globalThis.Buffer = Buffer
const CONTARCT = CrowdfundingNearContract;
const JWS = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyMDAyZTUxYS0yMjdmLTRlOTctOTcxZC0xODg1ODc4MDM4NWYiLCJlbWFpbCI6InJhb2FuaXJ1ZGRoOTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFiNjdkNjczOWRkOThlOTA2MmIwIiwic2NvcGVkS2V5U2VjcmV0IjoiODIyMjFhOThlNDAzYTFjM2UzMzEwYjJkMmUxMDFiYjUwNDJiOTFjYjA0M2IyZGY5ZDVjYWVmMTExYTM1YTZlZSIsImV4cCI6MTc4MTk0OTIxNn0.xIOPijzYn2xcTTVr10CuKVIiA1hmJjnQ9lDz-DPZPJ0';
const pinata = new PinataSDK({
    pinataJwt: JWS,
})
function Index() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [route, setRoute] = useState("home");
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldFetchData, setShouldFetchData] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        if (signedAccountId) {
            setConnected(true)
        } else {
            setConnected(false)
        }
    }, [signedAccountId])

    useEffect(() => {
        async function getAllNFTs() {
            if (connected && signedAccountId) {
                try {
                    setIsLoading(true);
                    const campaigns = await wallet.viewMethod({
                        contractId: CONTARCT,
                        method: "get_campaigns"
                    });

                    const currentTimestamp = Math.floor(Date.now() / 1000);
                    const deadlineNanoseconds = currentTimestamp * 1_000_000_000;
                    
                    const camp = campaigns.map(([id, campaign]) => ({
                        id,
                        ...campaign,
                        status: campaign.deadline > deadlineNanoseconds ? "open" : "closed"
                    }));

                    
                    setCampaigns(camp);
                    setShouldFetchData(false);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching NFTs:', error);
                    toast.error("Error fetching NFTs", {
                        position: "top-center"
                    })
                }
            }
        }
        getAllNFTs();
    }, [shouldFetchData, connected, signedAccountId]);

    const onRouteChange = (route) => {
        setRoute(route);
    }

    const uploadToPinata = async (file) => {
        if (!file) {
            throw new Error("File is required");
        }

        try {
            toast.info("Uploading Image to IPFS", {
                position: "top-center"
            })
            const uploadImage = await pinata.upload.file(file);
            const metadata = `https://beige-sophisticated-baboon-74.mypinata.cloud/ipfs/${uploadImage.IpfsHash}`;

            return metadata;
        } catch (error) {
            console.error("Error uploading to Pinata:", error);
            toast.error("Creating Fund failed.", {
                position: "top-center"
            });
            throw new Error("Upload to Pinata failed.");
        }
    };

    const createFund = async (ImageIpfsHash, title, description, targetAmount, time) => {
        try {
            const scaledPrice = Math.round(targetAmount * 1e24);
            const scaledTargetAmount = BigInt(scaledPrice).toString();

            const fee = 0.01;
            const scaledPrice2 = Math.round(fee * 1e24);
            const scaledFeeAmount = BigInt(scaledPrice2).toString();
            const tx = await wallet.callMethod({
                contractId: CONTARCT,
                method: 'create_campaign',
                args: {
                    image: ImageIpfsHash.toString(),
                    title: title.toString(),
                    description: description.toString(),
                    target: scaledTargetAmount,
                    deadline: Number(time)
                },
                deposit: scaledFeeAmount.toString()
            });
            toast.success("Campaign created!!", {
                position: "top-center"
            })
            setShouldFetchData(true);
            onRouteChange("explore");
        } catch (e) {
            toast.error("Error creating funds", {
                position: "top-center"
            });
            console.error("error", e)
        }
    }

    const fundCampaign = async (id, amount) => {
        try {
            const scaledPrice = Math.round(amount * 1e24);
            const scaledFundAmount = BigInt(scaledPrice).toString();

            const tx = await wallet.callMethod({
                contractId: CONTARCT,
                method: "donate",
                args: {
                    campaign_id: Number(id)
                },
                deposit: scaledFundAmount.toString(),
            })
            console.log(tx);
            toast.success("Campaign Funded!!", {
                position: "top-center"
            })
            setShouldFetchData(true);
        } catch (e) {
            toast.error("Error funding campaign", {
                position: "top-center"
            });
            console.error("error", e)
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='App min-h-screen'>
                <div className='gradient-bg-welcome h-screen w-screen'>
                    <Navbar onRouteChange={onRouteChange} />
                    {route === "home" ? (
                        <Home onRouteChange={onRouteChange} />
                    ) : route === "explore" ? (
                        <Explore campaigns={campaigns} isConnected={connected} isLoading={isLoading} fundCampaign={fundCampaign}/>
                    ) : route === "create" ? (
                        <Create uploadToPinata={uploadToPinata} createFund={createFund} />
                    ) : <>No page found</>}
                </div>
            </div>
        </div>
    )
}

export default Index