import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Shell, { Missing, ReviewMetadata } from './Shell';
import { Home, Services, ServiceDetail } from './Services';
import { Gallery, Project } from './Projects';
import { About, Process, Areas, Testimonials, Rebates, Partnerships } from './Information';
import { Contact, Estimator } from './Inquiry';
import { Journal, Article } from './Journal';
import Privacy from './Privacy';
const Admin = lazy(()=>import('./Admin'));
export default function V2(){return <Routes><Route path="admin/blog/*" element={<><ReviewMetadata/><Suspense fallback={<p role="status">Loading administration…</p>}><Admin/></Suspense></>}/><Route element={<Shell/>}><Route index element={<Home/>}/><Route path="services" element={<Services/>}/><Route path="services/:slug" element={<ServiceDetail/>}/><Route path="gallery" element={<Gallery/>}/><Route path="gallery/:slug" element={<Project/>}/><Route path="about" element={<About/>}/><Route path="how-it-works" element={<Process/>}/><Route path="areas-we-serve" element={<Areas/>}/><Route path="testimonials" element={<Testimonials/>}/><Route path="rebates" element={<Rebates/>}/><Route path="investment-partnerships" element={<Partnerships/>}/><Route path="privacy" element={<Privacy/>}/><Route path="contact" element={<Contact/>}/><Route path="estimator" element={<Estimator/>}/><Route path="blog" element={<Journal/>}/><Route path="blog/:slug" element={<Article/>}/><Route path="*" element={<Missing/>}/></Route></Routes>}
