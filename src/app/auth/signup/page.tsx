import Logo from "@/app/components/logo";
import Link from "next/link";

const Signup = () => {
    return (
        <main>
            <div className="container flex justify-center items-center">
                <div className="bg-white dark:bg-slate-800 rounded-lg w-5/6 sm:w-[25rem] p-6 sm:p-8 text-center mt-[15vh] sm:mt-[20vh]">
                    <form>
                        <Logo color={"[#f5ba13]"} />
                        <h1 className="my-4 text-xl text-slate-600 dark:text-slate-400">Please sign up</h1>

                        <div className="form-floating text-left my-1">
                            <label className="text-sm text-slate-600 dark:text-slate-400" htmlFor="floatingEmail">Email</label><br />
                            <input
                                type="email"
                                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none  font-family-inherit resize-none"
                                id="floatingEmail"
                                placeholder="name@example.com"
                                required
                                name="email"
                                autoFocus
                            />
                        </div>
                        <div className="form-floating text-left my-1 ">
                            <label className="text-sm  text-slate-600 dark:text-slate-400" htmlFor="floatingPassword">Password</label><br />
                            <input
                                type="password"
                                className="dark:bg-slate-700 w-full border border-slate-300 dark:border-slate-500 focus:border-[#f5ba13] rounded-lg mt-1 mr-1 p-1.5 outline-none  font-family-inherit resize-none"
                                id="floatingPassword"
                                placeholder="at least 8 characters long"
                                required
                                name="password" />
                        </div>
                        <button className=" mt-4 hover:bg-white text-xl w-full p-2 hover:text-[#f5ba13] border-[#f5ba13] border rounded-lg text-white bg-[#f5ba13]">Sign up</button>
                        <p className="mt-5 text-sm  text-slate-400 dark:text-slate-600">Already have an account? <br /><Link className="underline t" href="/auth/login">Login here</Link>.</p>
                    </form>
                </div >
            </div >
        </main >


    )
}

export default Signup;