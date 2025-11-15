import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg border-border",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
            footerActionLink: "text-primary hover:text-primary/80",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "border-border bg-background hover:bg-muted/50 text-foreground",
            formFieldLabel: "text-foreground",
            formFieldInput: "bg-background border-border text-foreground",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            identityPreviewText: "text-foreground",
            identityPreviewTextSecondary: "text-muted-foreground",
            alert: "bg-destructive/15 text-destructive border-destructive/20"
          }
        }}
        routing="path"
        path="/sign-in"
        redirectUrl="/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  )
}
