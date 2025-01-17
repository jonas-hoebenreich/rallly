import { InfoIcon } from "@rallly/icons";
import { cn } from "@rallly/ui";
import { Alert, AlertDescription, AlertTitle } from "@rallly/ui/alert";
import { Trans } from "next-i18next";

import { getPollLayout } from "@/components/layouts/poll-layout";
import { LoginLink } from "@/components/login-link";
import { Poll } from "@/components/poll";
import { RegisterLink } from "@/components/register-link";
import { useUser } from "@/components/user-provider";
import { usePoll } from "@/contexts/poll";
import { NextPageWithLayout } from "@/types";
import { getStaticTranslations } from "@/utils/with-page-translations";

const GuestPollAlert = () => {
  const poll = usePoll();
  const { user } = useUser();

  if (poll.user) {
    return null;
  }

  if (!user.isGuest) {
    return null;
  }
  return (
    <Alert icon={InfoIcon}>
      <AlertTitle className="mb-1 text-sm font-medium tracking-normal">
        <Trans
          i18nKey="guestPollAlertTitle"
          defaults="Your administrator rights can be lost if you clear your cookies"
        />
      </AlertTitle>
      <AlertDescription className="text-sm">
        <Trans
          i18nKey="guestPollAlertDescription"
          defaults="<0>Create an account</0> or <1>login</1> to claim this poll."
          components={[
            <RegisterLink
              className="hover:text-primary underline"
              key="register"
            />,
            <LoginLink className="hover:text-primary underline" key="login" />,
          ]}
        />
      </AlertDescription>
    </Alert>
  );
};

const Page: NextPageWithLayout = () => {
  return (
    <div className={cn("mx-auto w-full max-w-4xl space-y-3 sm:space-y-4")}>
      <GuestPollAlert />
      <Poll />
    </div>
  );
};

Page.getLayout = getPollLayout;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = getStaticTranslations;

export default Page;
