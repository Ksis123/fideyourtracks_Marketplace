import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react';
import { BaseLayout } from '@ui'
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { NftMeta, PinataRes } from '@_types/nft';
import axios from 'axios';
import { useWeb3 } from '@providers/web3';
import { ethers } from 'ethers';
import { toast } from "react-toastify";
import ReactAudioPlayer from "react-audio-player";

import { useNetwork } from '@hooks/web3';
import { ExclamationIcon } from '@heroicons/react/solid';


const ALLOWED_FIELDS = ["name", "description", "track"];


const NftCreate: NextPage = () => {
    const { network } = useNetwork();

    const { ethereum, contract } = useWeb3();
    const [nftURI, setNftURI] = useState("");
    const [price, setPrice] = useState("");
    const [hasURI, setHasURI] = useState(false);
    const [nftMeta, setNftMeta] = useState<NftMeta>({
        name: "",
        description: "",
        track: "",
    });

    const getSignedData = async () => {
        const messageToSign = await axios.get("/api/verify");
        const accounts = await ethereum?.request({ method: "eth_requestAccounts" }) as string[];
        const account = accounts[0];

        const signedData = await ethereum?.request({
            method: "personal_sign",
            params: [JSON.stringify(messageToSign.data), account, messageToSign.data.id]
        })

        return { signedData, account };
    }

    const handleaudio = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Select a file");
            return;
        }
        const file = e.target.files[0];
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        try {
            const { signedData, account } = await getSignedData();

            const promise = axios.post("/api/verify_track", {

                address: account,
                signature: signedData,
                bytes,
                contentType: file.type,
                fileName: file.name.replace(/\.[^/.]+$/, "")
            });

            const res = await toast.promise(
                promise, {
                pending: "Uploading Audio",
                success: "Audio uploaded",
                error: "Audio upload error"
            }
            )

            const data = res.data as PinataRes;

            setNftMeta({
                ...nftMeta,
                track: `${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`
            });

        } catch (e: any) {
            console.error(e.message);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNftMeta({ ...nftMeta, [name]: value });
    }

    const uploadMetadata = async () => {
        try {
            const { signedData, account } = await getSignedData();
            const promise = axios.post("/api/verify", {
                address: account,
                signature: signedData,
                nft: nftMeta
            })
            const res = await toast.promise(
                promise, {
                pending: "Uploading metadata",
                success: "Metadata uploaded",
                error: "Metadata upload error"
            }
            )

            const data = res.data as PinataRes;
            setNftURI(`${process.env.NEXT_PUBLIC_PINATA_DOMAIN}/ipfs/${data.IpfsHash}`);

        } catch (e: any) {
            console.error(e.message);
        }
    }

    const createNft = async () => {
        try {
            const nftRes = await axios.get(nftURI, {
                headers: { "Accept": "text/plain" }
            });
            const content = nftRes.data;

            Object.keys(content).forEach(key => {
                if (!ALLOWED_FIELDS.includes(key)) {
                    throw new Error("Invalid Json structure");
                }
            })

            const tx = await contract?.mintToken(
                nftURI,
                ethers.utils.parseEther(price), {
                value: ethers.utils.parseEther(0.025.toString())
            }
            );

            await toast.promise(
                tx!.wait(), {
                pending: "Uploading metadata",
                success: "Metadata uploaded Successfull",
                error: "Metadata upload error"
            }
            );

        } catch (e: any) {
            console.error(e.message);
        }
    }

    if (!network.isConnectedToNetwork) {
        return (
            <BaseLayout>
                <div className="rounded-md bg-yellow-50 p-4 mt-10">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <p>
                                    {network.isLoading ?
                                        "Loading..." :
                                        `Connect to ${network.targetNetwork}`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseLayout>
        )
    }

    return (
        <BaseLayout>
            <div>
                <div className="py-4">
                    {!nftURI &&
                        <div className="flex">
                            <div className="mr-2 font-bold  text-[#d8cbcb]">Do you have meta data already ?</div>
                            <Switch
                                checked={hasURI}
                                onChange={() => setHasURI(!hasURI)}
                                className={`${hasURI ? 'bg-primary' : 'bg-active'}
                  relative inline-flex flex-shrink-0 h-[28px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span className="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    className={`${hasURI ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[24px] w-[24px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                                />
                            </Switch>
                        </div>
                    }
                </div>
                {(nftURI || hasURI) ?
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-active">List NFT</h3>
                                <p className="mt-1 text-lm text-[#ffffff]">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    {hasURI &&
                                        <div className="px-4 py-5 bg-[#8d888129] space-y-6 sm:p-6">
                                            <div>
                                                <label htmlFor="uri" className="block text-sm font-medium text-secondary">
                                                    URI Link
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        onChange={(e) => setNftURI(e.target.value)}
                                                        type="text"
                                                        name="uri"
                                                        id="uri"
                                                        className="focus:ring-active focus:border-active flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                        placeholder="http://link.com/data.json"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {nftURI &&
                                        <div className='mb-4 p-4'>
                                            <div className="font-bold text-secondary">Your metadata: </div>
                                            <div>
                                                <Link href={nftURI}>
                                                    <a className="underline text-primary">
                                                        {nftURI}
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div>
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                Price (ETH)
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    value={price}
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    step="0.1"
                                                    min='0'
                                                    max='20'
                                                    className="focus:ring-primary focus:border-active flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                    placeholder="0.8"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="button"
                                            onClick={createNft}
                                            className="button inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-active focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                        >
                                            List
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-active">Upload Metadata</h3>
                                <p className="mt-1 text-lm text-[#c8c3c3]">
                                    Should be careful what you Upload NFT.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-[#cac2c23e] space-y-6 sm:p-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-secondary">
                                                NFT Name
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    value={nftMeta.name}
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className="focus:ring-primary focus:border-active flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                    placeholder="Enter your NFT name"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-secondary">
                                                Description
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    value={nftMeta.description}
                                                    onChange={handleChange}
                                                    id="description"
                                                    name="description"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-primary focus:border-active mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                    placeholder="Some NFT description..."
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-[#ffffff84]">
                                                Please input description about your NFT
                                            </p>
                                        </div>
                                        {nftMeta.track ?
                                            <ReactAudioPlayer
                                                controlsList={"nodownload"}
                                                src={nftMeta.track} controls
                                            />
                                            :
                                            <div>
                                                <label className="block text-sm font-medium text-secondary">Audio File</label>
                                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer  rounded-md font-medium text-active hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                                            >
                                                                <span>Upload Audio file</span>
                                                                <input
                                                                    onChange={handleaudio}
                                                                    id="file-upload"
                                                                    name="file-upload"
                                                                    type="file"
                                                                    className="sr-only"
                                                                />
                                                            </label>
                                                            <p className="pl-1 text-white">or drag and drop</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                    <div className="px-4 py-3 bg-[#cac2c23e] text-right sm:px-6">
                                        <button
                                            onClick={uploadMetadata}
                                            type="button"
                                            className="button inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-active focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-active"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </BaseLayout>
    )
}

export default NftCreate