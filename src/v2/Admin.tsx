import { Component, type ReactNode } from 'react';
import { Studio } from 'sanity';
import { studioConfig } from '@/lib/sanity-studio-config';
import { ButtonLink } from './Shell';
const config = {...studioConfig, basePath:'/v2/admin/blog'};
class Boundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<div role="alert" className="p-8"><h1>Administration could not load.</h1><p>Please reload and try again.</p><ButtonLink to="/v2/blog">Return to journal</ButtonLink></div>:this.props.children}}
export default function Admin(){if(!import.meta.env.VITE_SANITY_PROJECT_ID?.trim())return <div className="min-h-dvh bg-background p-8"><h1 className="mb-4 text-3xl">Blog administration</h1><p className="mb-6">Sanity is not configured for this environment. Set VITE_SANITY_PROJECT_ID and restart the application.</p><ButtonLink to="/v2/blog">Return to journal</ButtonLink></div>;return <Boundary><div className="h-dvh"><Studio config={config}/></div></Boundary>}
