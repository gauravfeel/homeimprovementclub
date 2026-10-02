import { CONTACT_PHONE_DISPLAY } from '@/lib/contact';
import { frame, Intro } from './Shell';
const sections = [
  [
    "Information we collect",
    <>
      <p>HIC may collect information you provide when requesting a consultation, submitting a form, calling, emailing, using WhatsApp or booking a meeting. This may include:</p>
      <ul>
        <li>Name, email address and phone number</li>
        <li>Property address, city and preferred contact time</li>
        <li>Project type, budget, message and other project details</li>
        <li>Information included in later correspondence or documents you choose to provide</li>
      </ul>
      <p>Our website may also collect device, browser, referral, page-view and interaction information through Google Analytics and Google Ads tags.</p>
    </>,
  ],
  [
    "How we use information",
    <>
      <p>We use personal information to:</p>
      <ul>
        <li>Respond to enquiries and discuss requested services</li>
        <li>Assess project location, scope and scheduling needs</li>
        <li>Arrange consultations and provide service-related communications</li>
        <li>Maintain lead and customer records</li>
        <li>Measure website and advertising performance</li>
        <li>Protect our website, investigate misuse and meet legal obligations</li>
      </ul>
      <p>We do not sell personal information. We use information only for identified purposes, compatible purposes or as permitted or required by law.</p>
    </>,
  ],
  [
    "Service providers and disclosures",
    <>
      <p>HIC uses providers that help operate its website and enquiry process. These may include Google Analytics, Google Ads, Google Sheets, Resend, Calendly, website hosting and WhatsApp. Providers receive information only as needed to perform their services and operate under their own terms and privacy practices.</p>
      <p>Information may be processed or stored outside British Columbia or Canada. When this happens, it may be subject to laws and lawful access requirements in those jurisdictions. We may also disclose information where required by law, to protect legal rights or in connection with a business transaction.</p>
    </>,
  ],
  [
    "Cookies, analytics and advertising",
    <>
      <p>Google technologies help us understand website use, measure submitted enquiries and evaluate advertising. These technologies may use cookies or similar identifiers. Your browser and Google advertising settings provide controls for cookies and personalized advertising. Blocking them may affect some website measurements or features.</p>
      <p>The enquiry widget on each page submits the same consultation details as the contact form. It does not keep those details in browser storage after you send it.</p>
    </>,
  ],
  [
    "Consent and communications",
    <>
      <p>By submitting an enquiry, you consent to HIC using the provided information to respond and communicate about that enquiry. Service and appointment messages may be sent by email, telephone or another channel you select.</p>
      <p>Commercial electronic messages will be sent only with consent or another lawful basis. Messages covered by Canada’s anti-spam rules will identify the sender and provide a way to unsubscribe. You may withdraw consent, subject to legal or contractual restrictions and reasonable notice.</p>
    </>,
  ],
  [
    "Retention and safeguards",
    <>
      <p>We retain personal information only as long as reasonably necessary for the purposes described, business record requirements, dispute resolution and legal obligations. Retention periods vary by record type and relationship.</p>
      <p>HIC uses reasonable administrative, technical and organizational safeguards appropriate to the information. No internet transmission or storage system can be guaranteed completely secure.</p>
    </>,
  ],
  [
    "Your privacy rights",
    <>
      <p>Subject to applicable law, you may request access to personal information HIC holds about you, ask how it has been used or disclosed, and request correction of inaccurate information. You may also ask a question, withdraw consent where applicable or raise a concern.</p>
      <p>We may need to verify your identity before responding. Some legal exceptions may limit access, correction or deletion. If a concern remains unresolved, you may contact the Office of the Information and Privacy Commissioner for British Columbia.</p>
    </>,
  ],
  [
    "External websites and updates",
    <>
      <p>Our website may link to third-party websites. HIC does not control their content or privacy practices. Review their policies before providing information.</p>
      <p>We may update this policy when our practices, services or legal obligations change. The effective date below shows the latest revision.</p>
    </>,
  ],
] as const;

export default function Privacy(){return <><Intro label="Privacy policy" title="Your information. Handled with care."><p>This policy explains how Home Improvement Club (“HIC,” “we,” “us”) handles personal information through homeimprovementclub.co and our enquiry, consultation and customer communications.</p><p className="mt-4">Effective September 14, 2026 · Website visitors, prospects and customers</p></Intro><div className={`${frame} grid gap-10 pb-16 lg:grid-cols-[0.6fr_1.4fr]`}><nav aria-label="Privacy policy sections" className="self-start border-t border-border py-4 lg:sticky lg:top-8">{sections.map(([title],i)=><a key={title} href={`#privacy-${i}`} className="block py-2 underline-offset-4 hover:underline">{title}</a>)}</nav><div className="space-y-10">{sections.map(([title,content],i)=><section id={`privacy-${i}`} key={title} className="scroll-mt-8 space-y-4 border-t border-border pt-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"><h2 className="!text-3xl">{title}</h2>{content}</section>)}<section className="border-t border-border pt-6"><h2 className="mb-4 !text-3xl">Questions, access or corrections.</h2><p>Contact HIC’s privacy contact at <a className="break-all underline" href="mailto:homeimprovementclub.co@gmail.com">homeimprovementclub.co@gmail.com</a> or <a className="underline" href="tel:+12363804423">{CONTACT_PHONE_DISPLAY}</a>.</p></section></div></div></>}
