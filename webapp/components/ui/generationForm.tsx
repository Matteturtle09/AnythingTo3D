'use client';
import React, { FC } from "react";
interface generationFormProps { }
import { useState } from "react";

const GenerationForm: FC<generationFormProps> = ({ }) => {
    const [resultData, setResultData] = useState()

    async function fetchApi() {
        try {
            const prompt = "a pineapple";
            const baseUrl = 'https://8887-34-83-228-151.ngrok-free.app';
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

    return (
        <div className="flex flex-col items-center w-full h-screen justify-center my-6 ">
            <div className="flex flex-col items-center justify-center w-11/12 md:w-3/4 h-screen border border-slate-300/20 bg-base-100/30 rounded-xl md:rounded-2xl backdrop-blur-sm">
                <h1 className="text-2xl ">3D generation</h1>
                <p className="text-sm md:text-md mb-4 mx-4 text-center w-3/4 md:w-1/2">
                    Generate a 3D model from a text prompt
                </p>
                <form>
                    <select
                        name="model"
                        className="select select-bordered select-md mb-4 w-full max-w-xs"
                    >
                        <option>SHAP-E text to 3D</option>
                    </select>
                    <div className="join flex">
                        <input
                            name="prompt"
                            className="textarea join-item mb-4"
                            placeholder="Your Prompt"
                        ></input>
                        <button className="btn btn-primary join-item">GENERATE</button>

                    </div>
                    {resultData?.status === "success" &&
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Your model has been generated with success!</span>
                        </div>
                    }
                    {resultData?.status === "processing" &&
                        <div role="alert" className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Processing {((resultData.files.length/4) * 100).toFixed(0)}%</span>
                        </div>
                    }
                </form>
            </div>
        </div>
    );
};

export default GenerationForm;
