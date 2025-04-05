import { cn } from "@/lib/utils";

export type DashBoardPageGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

export default function DashBoardPage({className, children}: DashBoardPageGenericProps) {
  return (
   <section className={cn(['h-screen', className])}>
    {children}
   </section>
  )
}

export function DashBoardPageHeader({className, children}: DashBoardPageGenericProps) {
  return (
   <header className={cn(['px-6 py-6 border-b border-border', className])}>
    {children}
   </header> 
  )
}

export function DashBoardPageHeaderTitle({className, children}: DashBoardPageGenericProps) {
  return (
    <h1 className={cn(['text-muted-foreground uppercase', className])}>
      {children}
    </h1>
  )
}

export function DashBoardPageHeaderNav({className, children}: DashBoardPageGenericProps) {
  return (
    <nav className={cn(['', className])}>
      {children}
    </nav>
  )
}

export function DashBoardPageMain({className, children}: DashBoardPageGenericProps) {
  return (
    <main className={cn(['bg-secondary p-6 h-screen', className])}>
      {children}
    </main>
  )
}
