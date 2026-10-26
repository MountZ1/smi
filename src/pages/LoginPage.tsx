import { useState, type ChangeEvent, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { validateLogin, type LoginErrors, type LoginValues } from "@/lib/validation";

const DEMO_ACCOUNT: LoginValues = { username: "emilys", password: "emilyspass" };

export function LoginPage() {
  const { session, login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginValues>({ username: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/auth/recipes" replace />;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validateLogin(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await login(values.username, values.password);
      navigate("/auth/recipes", { replace: true });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Login gagal. Coba lagi.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Masuk</CardTitle>
          <CardDescription>Masukkan username dan password untuk melanjutkan.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                autoComplete="username"
                value={values.username}
                onChange={handleChange}
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? "username-error" : undefined}
              />
              {errors.username && (
                <p id="username-error" className="text-sm text-destructive">
                  {errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-sm text-destructive">
                  {errors.password}
                </p>
              )}
            </div>

            {submitError && (
              <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {submitError}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
            <p>
              Akun demo: <code>{DEMO_ACCOUNT.username}</code> / <code>{DEMO_ACCOUNT.password}</code>
            </p>
            <button
              type="button"
              className="mt-1 underline underline-offset-2 hover:text-foreground"
              onClick={() => {
                setValues(DEMO_ACCOUNT);
                setErrors({});
                setSubmitError(null);
              }}
            >
              Isi otomatis
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
