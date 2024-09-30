import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { Social } from "@/components/auth/social";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type CardWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  headerTitle: string;
  headerDescription: string;
  backButtonLabel: string;
  backButtonHref?: string;
  isMobile?: boolean;
  showSocial?: boolean;
  heroImage?: string;
};

export const CardWrapper = (props: CardWrapperProps) => {
  const {
    heroImage,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    isMobile,
    showSocial,
    children,
    ...rest
  } = props;

  return (
    <Card className={` ${isMobile ? "w-full" : "w-[400px]"}`} {...rest}>
      {heroImage ? (
        <div className="w-1/4 relative pt-6 mx-auto">
          <Image
            src={heroImage}
            alt="Hero Image"
            width={24}
            height={24}
            className="relative w-full h-full max-w-md select-none"
          />
        </div>
      ) : null}
      <CardHeader className="text-center">
        <CardTitle>{headerTitle}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>
      {children ? <CardContent>{children}</CardContent> : null}
      {showSocial ? (
        <>
          <CardFooter className="gap-x-2">
            <Separator className="shrink" />
            <p className="text-sm text-center basis-full">Or connect with</p>
            <Separator className="shrink" />
          </CardFooter>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      ) : null}
      {!isMobile && (
        <>
          <Separator />
          <CardFooter className="py-3">
            <Button
              variant="anylink"
              className="font-normal w-full"
              size="sm"
              asChild
            >
              {backButtonHref && (
                <Link href={backButtonHref}>{backButtonLabel}</Link>
              )}
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
