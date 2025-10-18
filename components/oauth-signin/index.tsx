import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OAUTH_PROVIDERS } from "@/constants";
import { OAuthSignInProps } from "@/types";
import { onSignIn } from "@/utils/auth-actions";

export const OAuthSignin = ({
  className,
  callbackUrl,
  isPending,
}: OAuthSignInProps) =>
  OAUTH_PROVIDERS.map((provider) => (
    <Button
      variant="outline"
      key={provider.label}
      title={provider.label}
      disabled={isPending}
      className={cn(
        "w-full dark:border-neutral-700/45 cursor-pointer",
        className
      )}
      type="button"
      onClick={() => onSignIn({ provider: provider.name, callbackUrl })}
    >
      <provider.icon
        aria-hidden="true"
        className="dark:text-neutral-200 text-black"
      />
      {provider.label}
    </Button>
  ));
