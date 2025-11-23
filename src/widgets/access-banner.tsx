import { AuthDialog } from "../features/auth/dialog";
import { Text } from "@/shared/ui";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const AccessBanner = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "border flex justify-between p-3 items-center rounded-md gap-4 max-w-xl w-full",
        className
      )}
    >
      <Text variant="xs" color="primary">
        Join the closed beta testing and gain access to new features.
      </Text>

      <AuthDialog
        trigger={<AuthDialog.Trigger>Full access</AuthDialog.Trigger>}
      />
    </div>
  );
};

export { AccessBanner };
