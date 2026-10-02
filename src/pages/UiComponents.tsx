import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Info, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchInput } from "@/components/ui/search-input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Divider } from "@/components/ui/divider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionHeader } from "@/components/sections/section-header";
import { ImageCard } from "@/components/sections/image-card";
import { ServiceFeatureCard } from "@/components/sections/service-feature-card";
import { ServiceBreadcrumb, QuestionList } from "@/components/ServicePrimitives";
import CTASection from "@/components/CTASection";
import { GALLERY_PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import lighting from "@/assets/lux-lighting.jpg";

const COLOR_SWATCHES = [
  { name: "Background", token: "--background", css: "hsl(var(--background))" },
  { name: "Foreground", token: "--foreground", css: "hsl(var(--foreground))" },
  { name: "Muted", token: "--muted", css: "hsl(var(--muted))" },
  { name: "Muted foreground", token: "--muted-foreground", css: "hsl(var(--muted-foreground))" },
  { name: "Surface", token: "--surface", css: "var(--surface)" },
  { name: "Elevated surface", token: "--surface-elevated", css: "var(--surface-elevated)" },
  { name: "Border", token: "--border", css: "hsl(var(--border))" },
  { name: "Primary", token: "--primary", css: "hsl(var(--primary))" },
  { name: "Primary foreground", token: "--primary-foreground", css: "hsl(var(--primary-foreground))" },
  { name: "Secondary", token: "--secondary", css: "hsl(var(--secondary))" },
  { name: "Accent", token: "--accent", css: "hsl(var(--accent))" },
  { name: "Sage", token: "--sage", css: "var(--sage)" },
  { name: "Success", token: "--success", css: "hsl(var(--success))" },
  { name: "Warning", token: "--warning", css: "hsl(var(--warning))" },
  { name: "Destructive", token: "--destructive", css: "hsl(var(--destructive))" },
  { name: "Focus", token: "--ring", css: "hsl(var(--ring))" },
  { name: "Overlay", token: "--overlay", css: "var(--overlay)" },
] as const;

const TYPE_ROWS = [
  { name: "Display", sample: "Fraser Valley’s custom homes.", style: { fontFamily: "var(--font-display)", fontSize: "var(--type-display)", fontWeight: 400, lineHeight: 1.12 } as const, meta: "Source Serif 4 · 400 · --type-display · 1.12" },
  { name: "H1", sample: "Plan the house around how you live.", style: { fontFamily: "var(--font-display)", fontSize: "var(--type-h1)", fontWeight: 400, lineHeight: 1.12 } as const, meta: "Source Serif 4 · 400 · --type-h1 · 1.12" },
  { name: "H2", sample: "From an idea to your everyday.", style: { fontFamily: "var(--font-display)", fontSize: "var(--type-h2)", fontWeight: 400, lineHeight: 1.16 } as const, meta: "Source Serif 4 · 400 · --type-h2 · 1.16" },
  { name: "H3", sample: "Kitchen cabinets and millwork.", style: { fontFamily: "var(--font-display)", fontSize: "var(--type-h3)", fontWeight: 400, lineHeight: 1.23 } as const, meta: "Source Serif 4 · 400 · --type-h3 · 1.23" },
  { name: "H4", sample: "A useful first conversation.", style: { fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.3 } as const, meta: "Source Serif 4 · 400 · 1.25rem · 1.3" },
  { name: "Body large", sample: "Custom homes, multiplex, and renovations across the Fraser Valley.", style: { fontFamily: "var(--font-body)", fontSize: "var(--type-large)", fontWeight: 400, lineHeight: 1.6 } as const, meta: "Source Sans 3 · 400 · --type-large · 1.6" },
  { name: "Body", sample: "Start with the property, the home you want, or the rooms ready to change.", style: { fontFamily: "var(--font-body)", fontSize: "var(--type-body)", fontWeight: 400, lineHeight: 1.65 } as const, meta: "Source Sans 3 · 400 · --type-body · 1.65" },
  { name: "Body small", sample: "Free consultation. No commitment required.", style: { fontFamily: "var(--font-body)", fontSize: "var(--type-small)", fontWeight: 400, lineHeight: 1.5 } as const, meta: "Source Sans 3 · 400 · --type-small · 1.5" },
  { name: "Label", sample: "First name", style: { fontFamily: "var(--font-body)", fontSize: "var(--type-ui)", fontWeight: 600, lineHeight: 1.4 } as const, meta: "Source Sans 3 · 600 · --type-ui · 1.4" },
  { name: "Caption", sample: "Design inspiration · Light and proportion", style: { fontFamily: "var(--font-body)", fontSize: "var(--type-caption)", fontWeight: 500, lineHeight: 1.45 } as const, meta: "Source Sans 3 · 500 · --type-caption · 1.45" },
] as const;

const SPACES = [1, 2, 3, 4, 6, 8, 12, 16, 24] as const;

const sampleProject = GALLERY_PROJECTS.find((project) => !project.comingSoon) ?? GALLERY_PROJECTS[0];
const sampleService = SERVICES[0];

export default function UiComponents() {
  const [checked, setChecked] = useState(true);
  return (
    <Layout>
      <SEO
        title="Design System | Home Improvement Club"
        description="Reusable foundations and interface components used throughout the Home Improvement Club website."
        canonical="/ui/components"
        robots="noindex, nofollow"
      />
      <div className="ds-page">
        <div className="ds-page-inner">
          <header className="ds-page-header">
            <p className="eyebrow">HIC interface</p>
            <h1>
              Design
              <br />
              <em>System</em>
            </h1>
            <p>Reusable foundations and interface components used throughout the website.</p>
            <div className="ds-meta">
              <span>v1.0</span>
              <span>Vite · React · Tailwind</span>
              <span>Source Serif 4 + Source Sans 3</span>
            </div>
          </header>

          <nav className="ds-toc" aria-label="Design system sections">
            {[
              ["#foundations", "Foundations"],
              ["#buttons", "Buttons"],
              ["#forms", "Forms"],
              ["#cards", "Cards"],
              ["#badges", "Badges"],
              ["#navigation", "Navigation"],
              ["#feedback", "Feedback"],
              ["#overlays", "Overlays"],
              ["#sections", "Sections"],
            ].map(([href, label]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <section className="ds-section" id="foundations">
            <h2>1. Foundations</h2>
            <p>Colors, type, space, radius and elevation taken from the live marketing site. No new hues.</p>
            <h3 className="!text-xl">Colors</h3>
            <dl className="ds-grid">
              {COLOR_SWATCHES.map((swatch) => (
                <div className="ds-swatch" key={swatch.token}>
                  <div className="ds-swatch-chip" style={{ background: swatch.css }} />
                  <dt>{swatch.name}</dt>
                  <dd>
                    <code>{swatch.token}</code>
                  </dd>
                </div>
              ))}
            </dl>
            <h3 className="!text-xl">Typography</h3>
            <div>
              {TYPE_ROWS.map((row) => (
                <div className="ds-type-row" key={row.name}>
                  <p className="ds-type-meta">
                    {row.name} · {row.meta}
                  </p>
                  <p style={row.style}>{row.sample}</p>
                </div>
              ))}
            </div>
            <h3 className="!text-xl">Spacing</h3>
            <div className="grid gap-3">
              {SPACES.map((space) => (
                <div className="ds-space-row" key={space}>
                  <span>{space}</span>
                  <div className="ds-space-bar" style={{ width: `var(--space-${space})` }} />
                  <code>--space-{space}</code>
                </div>
              ))}
            </div>
            <h3 className="!text-xl">Border radius</h3>
            <div className="ds-grid">
              {[
                ["Small", "var(--radius-sm)"],
                ["Medium", "var(--radius-md)"],
                ["Large", "var(--radius-lg)"],
                ["Extra large", "var(--radius-xl)"],
                ["Pill", "var(--radius-pill)"],
              ].map(([label, radius]) => (
                <div key={label} className="ds-radius-chip" style={{ borderRadius: radius }}>
                  {label}
                  <br />
                  {radius}
                </div>
              ))}
            </div>
            <h3 className="!text-xl">Shadows</h3>
            <div className="ds-grid">
              {[
                ["Small", "var(--shadow-sm)"],
                ["Medium", "var(--shadow-md)"],
                ["Large", "var(--shadow-lg)"],
              ].map(([label, shadow]) => (
                <div key={label} className="ds-shadow-chip" style={{ boxShadow: shadow }}>
                  {label}: none. HIC uses borders, not drop shadows.
                </div>
              ))}
            </div>
          </section>

          <section className="ds-section" id="buttons">
            <h2>2. Button</h2>
            <p>Forest CTA from header, hero and enquiry. Tailwind tokens, not page-level class strings.</p>
            <h3 className="!text-xl">Variants</h3>
            <div className="ds-preview">
              <div className="ds-row">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">
                  Link <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
            <h3 className="!text-xl">Sizes</h3>
            <div className="ds-preview">
              <div className="ds-row">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Open project">
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
            <h3 className="!text-xl">States</h3>
            <div className="ds-preview">
              <div className="ds-row">
                <Button disabled>Disabled</Button>
                <Button loading>Saving</Button>
                <Button>
                  <ArrowUpRight size={16} />
                  With icon
                </Button>
              </div>
            </div>
          </section>

          <section className="ds-section" id="forms">
            <h2>3. Form controls</h2>
            <p>Input, Textarea, Select, Checkbox, Radio and Switch share one control language. Compose with Field, not a mega-Input.</p>
            <form className="ds-form ds-preview" onSubmit={(event) => event.preventDefault()}>
              <Field>
                <FieldLabel htmlFor="ds-name" required>
                  Full name
                </FieldLabel>
                <Input id="ds-name" name="name" autoComplete="name" placeholder="Alex Chen" />
                <FieldDescription>How we should address you.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-email" required>
                  Email
                </FieldLabel>
                <Input id="ds-email" type="email" autoComplete="email" placeholder="alex@email.com" />
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-search">Search projects</FieldLabel>
                <SearchInput id="ds-search" placeholder="Burnaby, kitchen, multiplex" />
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-city">City</FieldLabel>
                <Select defaultValue="surrey">
                  <SelectTrigger id="ds-city" aria-label="City">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surrey">Surrey</SelectItem>
                    <SelectItem value="langley">Langley</SelectItem>
                    <SelectItem value="burnaby">Burnaby</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-notes">Notes</FieldLabel>
                <Textarea id="ds-notes" rows={4} placeholder="Property, scope and timing." />
              </Field>
              <Field>
                <div className="flex items-center gap-3">
                  <Checkbox id="ds-visit" defaultChecked />
                  <FieldLabel htmlFor="ds-visit" className="font-medium">
                    Site visit is possible
                  </FieldLabel>
                </div>
              </Field>
              <Field>
                <FieldLabel>Preferred contact</FieldLabel>
                <RadioGroup defaultValue="phone" className="gap-3">
                  <div className="flex min-h-11 items-center gap-3">
                    <RadioGroupItem value="phone" id="ds-phone" />
                    <FieldLabel htmlFor="ds-phone" className="font-medium">
                      Phone
                    </FieldLabel>
                  </div>
                  <div className="flex min-h-11 items-center gap-3">
                    <RadioGroupItem value="email" id="ds-mail" />
                    <FieldLabel htmlFor="ds-mail" className="font-medium">
                      Email
                    </FieldLabel>
                  </div>
                </RadioGroup>
              </Field>
              <Field>
                <div className="flex min-h-11 items-center gap-3">
                  <Switch id="ds-updates" checked={checked} onCheckedChange={setChecked} />
                  <FieldLabel htmlFor="ds-updates" className="font-medium">
                    Project updates
                  </FieldLabel>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-error">Address</FieldLabel>
                <Input id="ds-error" aria-invalid defaultValue="" placeholder="Street address" />
                <FieldError>Enter a property address so we can start with the site.</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="ds-disabled">Budget</FieldLabel>
                <Input id="ds-disabled" disabled placeholder="Shared after the first call" />
              </Field>
              <Button type="submit">Submit sample</Button>
            </form>
          </section>

          <section className="ds-section" id="cards">
            <h2>4. Cards</h2>
            <p>Editorial cards already used on home, services and portfolio.</p>
            <div className="ds-preview">
              <Card>
                <CardHeader>
                  <CardTitle>Standard card</CardTitle>
                  <CardDescription>Ivory surface, 1px line, no shadow.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Use for contained notes inside a page, not for the main marketing grids.</p>
                </CardContent>
              </Card>
              {sampleService ? (
                <ServiceFeatureCard
                  href={`/services/${sampleService.slug}`}
                  image={sampleService.image}
                  label={sampleService.label}
                  description={sampleService.short}
                  index="01"
                />
              ) : null}
              {sampleProject ? (
                <ImageCard
                  href={`/gallery/${sampleProject.slug}`}
                  image={sampleProject.image}
                  imageAlt={sampleProject.imageAlt}
                  kicker={sampleProject.category}
                  title={sampleProject.title}
                  description={sampleProject.teaser}
                />
              ) : null}
              <Card className="border-x-0 border-b-0 bg-transparent p-0 pt-7">
                <p className="eyebrow">Client stories</p>
                <CardTitle>Homeowner point of view</CardTitle>
                <CardDescription>
                  Testimonials stay empty until consented, attributable stories exist. No placeholder quotes.
                </CardDescription>
              </Card>
            </div>
          </section>

          <section className="ds-section" id="badges">
            <h2>5. Badge</h2>
            <p>Compact status chips. Not buttons.</p>
            <div className="ds-row">
              <Badge>New</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="muted">Muted</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Completed</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="destructive">Error</Badge>
            </div>
          </section>

          <section className="ds-section" id="navigation">
            <h2>6. Navigation</h2>
            <div className="ds-preview">
              <div className="ds-nav-demo" aria-label="Sample navigation">
                <Link to="/services">Services</Link>
                <Link to="/how-it-works">Process</Link>
                <Link to="/ui/components" aria-current="page">
                  Design system
                </Link>
              </div>
              <ServiceBreadcrumb label="Kitchens" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Design system</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <Tabs defaultValue="build">
                <TabsList>
                  <TabsTrigger value="build">Build</TabsTrigger>
                  <TabsTrigger value="renovate">Renovate</TabsTrigger>
                </TabsList>
                <TabsContent value="build">Custom homes and multiplex planning.</TabsContent>
                <TabsContent value="renovate">Kitchens, bathrooms and systems.</TabsContent>
              </Tabs>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#navigation" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#navigation" isActive>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#buttons">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#feedback" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </section>

          <section className="ds-section" id="feedback">
            <h2>7. Alert and Divider</h2>
            <div className="ds-preview">
              <Alert variant="info">
                <Info className="h-4 w-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>Start with the property address rather than a public showroom.</AlertDescription>
              </Alert>
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your enquiry is on its way. We will be in touch.</AlertDescription>
              </Alert>
              <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Budget figures are discussion ranges, not quotes.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Please email homeimprovementclub.co@gmail.com</AlertDescription>
              </Alert>
              <p className="text-[length:var(--type-small)] text-muted-foreground">Divider uses the border token.</p>
              <Divider />
              <EmptyState
                eyebrow="Empty"
                title="No published stories yet."
                description="This collection stays empty until consented homeowner stories exist."
                action={
                  <Button variant="link" asChild>
                    <Link to="/services">
                      Browse services <ArrowUpRight size={16} />
                    </Link>
                  </Button>
                }
              />
              <div className="grid gap-3" role="status" aria-label="Loading">
                <span className="sr-only">Loading content</span>
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-24 w-full" />
                <div className="flex items-center gap-2 text-[length:var(--type-small)] text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Loading
                </div>
              </div>
            </div>
          </section>

          <section className="ds-section" id="overlays">
            <h2>8. Overlay components</h2>
            <p>Forest overlay. Square panels. Keyboard focus stays in the overlay.</p>
            <div className="ds-row">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Project conversation</DialogTitle>
                    <DialogDescription>
                      Share the property and what you want to build or change.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button>Continue</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open drawer</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Services</SheetTitle>
                    <SheetDescription>Choose a project path.</SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
              <Drawer shouldScaleBackground={false}>
                <DrawerTrigger asChild>
                  <Button variant="outline">Open sheet</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Mobile sheet</DrawerTitle>
                    <DrawerDescription>Fits small screens. Close with the button or Escape.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="secondary">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Custom homes</DropdownMenuItem>
                  <DropdownMenuItem>Renovations</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Open popover</Button>
                </PopoverTrigger>
                <PopoverContent>Hours: by appointment across the Fraser Valley.</PopoverContent>
              </Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>Forest focus, ivory surface.</TooltipContent>
              </Tooltip>
            </div>
          </section>

          <section className="ds-section" id="sections">
            <h2>9. Section patterns</h2>
            <div className="grid gap-12">
              <SectionHeader
                eyebrow="Build new · Add homes · Renovate"
                title={
                  <>
                    Start with the
                    <br />
                    <em>right project path.</em>
                  </>
                }
                description="Plan a custom home or multiplex. Improve one room or the whole home."
                action={
                  <Button variant="link" asChild>
                    <Link to="/services">
                      All services <ArrowUpRight size={16} />
                    </Link>
                  </Button>
                }
              />
              <div className="mx-auto mt-5 grid max-w-[1600px] grid-cols-1 bg-[var(--stone)] min-[641px]:grid-cols-2">
                <figure className="relative min-h-[340px] min-[641px]:min-h-[580px]">
                  <img src={lighting} alt="Warm interior lighting used as design inspiration" className="absolute h-full w-full object-cover" />
                  <figcaption className="absolute bottom-3.5 left-[18px] bg-[color-mix(in_srgb,var(--forest-hover)_91%,transparent)] px-2.5 py-1.5 text-[length:var(--type-caption)] text-white">
                    Design inspiration · Light and proportion
                  </figcaption>
                </figure>
                <div className="self-center px-6 py-12 min-[641px]:px-[60px] min-[641px]:py-[90px]">
                  <p className="eyebrow">The details matter</p>
                  <h2>
                    Beautiful is how it looks.
                    <br />
                    <em>Better is how it lives.</em>
                  </h2>
                  <p className="my-7 max-w-[410px] text-[length:var(--type-body)] text-muted-foreground">
                    A place for the things you use. Light where you need it.
                  </p>
                </div>
              </div>
              <div>
                <p className="eyebrow">At a glance</p>
                <dl className="grid gap-6">
                  <div>
                    <dt className="font-semibold">Service area</dt>
                    <dd className="text-[var(--ink-muted)]">Fraser Valley and Greater Vancouver.</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Starting point</dt>
                    <dd className="text-[var(--ink-muted)]">Property, home and the work you are considering.</dd>
                  </div>
                </dl>
              </div>
              <QuestionList
                className="mt-10"
                items={[
                  {
                    question: "Do we need finished drawings to start?",
                    answer: "No. Location, priorities and timing are enough for a first conversation.",
                  },
                ]}
              />
              <Divider />
              <CTASection />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
