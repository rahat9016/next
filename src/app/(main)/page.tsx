import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center">
      <p className="underline text-5xl font-bold text-sky-900">
        Dashboard boilerplate
      </p>
      <p className="underline text-2xl font-semibold text-black">
        {" "}
        Home page / login page / landing page
      </p>
      <Link href="/dashboard">
        <button className="border rounded-full border-sky-900 bg-sky-700 text-white text-base font-semibold px-6 py-3 hover:text-sky-700 hover:bg-white duration-300">
          Go To Dashboard
        </button>
      </Link>

    </div>
  );
};

export default page;
