import PageHeader, { type PageHeaderProps } from "./PageHeader";
import { fortuneContentContainer, fortunePageBackground } from "../lib/fortuneDesign";

type FortunePageShellProps = PageHeaderProps & {
  children: React.ReactNode;
  backgroundClassName?: string;
  contentClassName?: string;
};

export default function FortunePageShell({
  children,
  backgroundClassName = fortunePageBackground,
  contentClassName = fortuneContentContainer,
  ...headerProps
}: FortunePageShellProps) {
  return (
    <div className={backgroundClassName}>
      <PageHeader {...headerProps} />
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
