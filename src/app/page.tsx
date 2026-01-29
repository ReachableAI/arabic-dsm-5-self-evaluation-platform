import { redirect } from "next/navigation";

/**
 * Root page - Redirects to welcome flow
 */
export default function RootPage() {
  redirect("/welcome");
}
