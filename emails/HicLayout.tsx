import type { ReactNode } from "react";
import React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { logoUrl, hicEmailTailwind, siteUrl } from "./theme";

type HicLayoutProps = {
  preview: string;
  children: ReactNode;
};

export function HicLayout({ preview, children }: HicLayoutProps) {
  const site = siteUrl();
  return (
    <Tailwind config={hicEmailTailwind}>
      <Html>
        <Head>
          <Font
            fontFamily="Source Serif 4"
            fallbackFontFamily="Georgia"
            webFont={{
              url: "https://fonts.gstatic.com/s/sourceserif4/v8/vEFSR0NLisO8r8HGy7qhFs6jR-wq.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
          <Font
            fontFamily="Source Sans 3"
            fallbackFontFamily="Arial"
            webFont={{
              url: "https://fonts.gstatic.com/s/sourcesans3/v15/nwpBtKy2OAdR1K-IwhWudF-R3w.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>{preview}</Preview>
        <Body className="m-0  p-0 font-sans text-ink">
          <Container className="mx-auto max-w-[640px] px-[16px] py-[32px]">
            <Section className="overflow-hidden rounded-[10px] border border-solid border-line bg-ivory-bright">
              <Section className="border-0 px-[28px] pb-[22px] pt-[24px] sm:px-[40px]">
                <Link href={site}>
                  <Img
                    src={logoUrl()}
                    alt="Home Improvement Club"
                    width={64}
                    className="block h-auto border-none"
                  />
                </Link>
              </Section>
              <Section className="px-[16px] pb-[36px] pt-[18px] sm:px-[40px]">
                {children}
              </Section>
              <Section className="border-0 border-t border-solid border-line bg-stone px-[16px] py-[22px] sm:px-[40px]">
                <Text className="m-0 font-sans text-[12px] leading-[19px] text-ink-muted">
                  <span className="font-semibold text-ink">
                    Home Improvement Club
                  </span>
                  <br />
                  Custom homes, multiplexes &amp; renovations
                  <br />
                  <Link
                    href="tel:+12363804423"
                    className="text-forest no-underline"
                  >
                    +1 236-380-4423
                  </Link>
                  {" · "}
                  <Link href={site} className="text-forest no-underline">
                    homeimprovementclub.co
                  </Link>
                </Text>
              </Section>
            </Section>
            <Text className="m-0 px-[16px] pt-[18px] text-center font-sans text-[11px] leading-[17px] text-ink-muted">
              Serving Vancouver, the North Shore and the Fraser Valley.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
