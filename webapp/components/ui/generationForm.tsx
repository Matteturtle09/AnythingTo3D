'use client';
import React, { FC } from "react";
import { useState } from "react";
import ModelViewer from "./modelViewer";
import { useForm } from "react-hook-form";
import useLocalStorageState from 'use-local-storage-state'
import { XRButton } from "@react-three/xr";


interface generationFormProps { }

const GenerationForm: FC<generationFormProps> = ({ }) => {
    const [resultData, setResultData] = useLocalStorageState('resultdata')

    async function fetchApi(data) {
        try {
            console.log(data)
            const prompt = data.prompt
            const baseUrl = data.baseUrl || 'bella bro';
            const startRes = await fetch(`${baseUrl}/api/shap-e/text-to-3d/start?prompt=${prompt}`, { headers: { "ngrok-skip-browser-warning": "a" } });
            const startData = await startRes.json();
            const reqid = startData.reqid;

            const pollingInterval = setInterval(async (): Promise<void> => {
                try {
                    const filesRes = await fetch(`${baseUrl}/api/shap-e/text-to-3d/get-files?reqid=${reqid}`, { headers: { "ngrok-skip-browser-warning": "a" } });
                    const filesData = await filesRes.json();
                    setResultData(filesData)
                    console.log(filesData);

                    if (filesData?.status === "success") {
                        console.log('finished');
                        clearInterval(pollingInterval);
                    }
                } catch (error) {
                    console.error("Error fetching files:", error);
                }
            }, 2000);
        } catch (error) {
            console.error("Error fetching API:", error);
        }
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => { await fetchApi(data) }


    return (
        <>
            <div className="flex flex-col items-center w-full h-full justify-center my-6 ">
                <div className="flex flex-col items-center justify-center w-11/12 md:w-3/4 py-4 h-full border border-slate-300/20 bg-base-100/30 rounded-xl md:rounded-2xl backdrop-blur-sm">
                    <h1 className="text-2xl ">3D generation</h1>
                    <p className="text-sm md:text-md mb-4 mx-4 text-center w-3/4 md:w-1/2">
                        Generate a 3D model from a text prompt
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select
                            className="select select-bordered select-md mb-4 w-full max-w-xs"
                            {...register("model")}
                        >
                            <option>SHAP-E text to 3D</option>
                        </select>
                        <div className="collapse border rounded-lg border-slate-300/20 border-2 mb-4">
                            <input type="checkbox" />
                            <div className="collapse-title text-md">
                                Advanced Options
                            </div>
                            <div className="collapse-content">
                                <input
                                    className="textarea join-item mb-4"
                                    placeholder="Your server url"
                                    {...register("baseUrl")}
                                ></input>
                                <a target="_blank" href="https://colab.research.google.com/drive/17Axr5cUswVyUVMVCl81u5jlHiT4fE8lM">
                                    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" />
                                </a>
                                <p className="text-sm md:text-md mt-2">Start your free server</p>
                            </div>
                        </div>
                        <div className="join flex">
                            <input
                                className="textarea join-item mb-4"
                                placeholder="Your Prompt"
                                {...register("prompt")}
                            ></input>

                            <button className="btn btn-primary join-item">GENERATE</button>

                        </div>


                    </form>
                    {resultData?.status === "success" &&
                        <div role="alert" className="alert alert-success w-3/4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Your model has been generated with success!</span>
                        </div>
                    }
                    <div className="mt-3 grid grid-cols-1 md:cols-2 gap-2">
                        {resultData?.ply_files && resultData.ply_files.map((file) => (
                            <div key={file} className="">
                                <ModelViewer key={file} modelUrl={file} />
                                <a
                                    href={file}
                                    download={file}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <button className="btn btn-primaty">Download file</button>
                                </a>
                            </div>
                        ))}
                    </div>
                    {resultData?.status === "processing" &&
                        <div role="alert" className="alert alert-info w-3/4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Processing {((resultData.files.length / 4) * 100).toFixed(0)}%</span>
                        </div>

                    }
                </div>
            </div>
        </>
    );
};

export default GenerationForm;
