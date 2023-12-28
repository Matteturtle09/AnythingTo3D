
import React, { FC } from 'react';

interface generationFormProps {
}

const GenerationForm: FC<generationFormProps> = ({ }) => {

    async function generate(formData: FormData) {
        "use server";

        const rawFormData = {
            model: formData.get('model'),
            prompt: formData.get('prompt'),
        }
        
    }

    return (
        <div className='flex flex-col items-center w-full h-screen justify-center my-6 '>
            <div className='flex flex-col items-center justify-center w-11/12 md:w-3/4 h-screen border border-slate-300/20 bg-base-100/30 rounded-xl md:rounded-2xl backdrop-blur-sm'>
                <h1 className='text-2xl '>3D generation</h1>
                <p className='text-sm md:text-md mb-4 mx-4 text-center w-3/4 md:w-1/2'>Generate a 3D model from a text prompt</p>
                <form action={generate}>
                    <select name='model' className="select select-bordered select-md mb-4 w-full max-w-xs">
                        <option>SHAP-E text to 3D</option>
                    </select>
                    <div className='join flex' >
                        <input name='prompt' className="textarea join-item mb-4" placeholder='Your Prompt'></input>
                        <button className="btn btn-primary join-item">GENERATE</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default GenerationForm;