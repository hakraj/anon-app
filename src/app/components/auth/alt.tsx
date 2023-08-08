import Link from "next/link"


const Alt = ({ use }: { use: string }) => {

  switch (use) {
    case "signup":
      return (
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-600">
          Already have an account? <br />
          <Link className="underline text-black dark:text-white" href="/auth/login">Login here</Link>.
        </p>
      );

    case "login":
      return (
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-600">
          Don&apos;t have an account? <br />
          <Link className="underline text-black dark:text-white" href="/auth/signup">Signup here</Link>.
        </p>
      );

    default:
      break;
  }
}

export default Alt;