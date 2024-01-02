import Image from 'next/image'
import Hero from '@/components/ui/hero'
import ModelViewer from '@/components/ui/modelViewer'
export default function Home() {
  return (
    <>
    <Hero backgroundImage="/hero/1.gif" title='Generate 3D models from simple prompts' content="Transforming text to 3D models with AI seamlessly bridges the linguistic and visual realms, allowing for dynamic and intuitive creation based on textual descriptions."/>
    <ModelViewer modelUrl='https://6c2c-34-125-177-131.ngrok-free.app/api/storage/9d7b46db-0d09-4fcd-8972-0242ab6cc555/mesh_3.ply'/>
    </>
    )
}
